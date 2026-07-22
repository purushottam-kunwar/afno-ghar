'use client'

import { useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useContent } from './ContentProvider'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const BUCKET = 'site-images'

export interface ImageSpec {
  /** Human description shown in hints and errors, e.g. "landscape (16:10)" */
  shape: string
  minWidth: number
  minHeight: number
  aspect: number
  /** Allowed deviation from `aspect` as a fraction (0.2 = ±20%) */
  aspectTolerance: number
}

export const IMAGE_SPECS: Record<'project' | 'about', ImageSpec> = {
  project: {
    shape: 'landscape (16:10)',
    minWidth: 800,
    minHeight: 500,
    aspect: 16 / 10,
    aspectTolerance: 0.2,
  },
  about: {
    shape: 'portrait (4:5)',
    minWidth: 600,
    minHeight: 750,
    aspect: 4 / 5,
    aspectTolerance: 0.2,
  },
}

function readDimensions(file: File): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve({ w: img.naturalWidth, h: img.naturalHeight })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('not an image'))
    }
    img.src = url
  })
}

/** Returns an error message, or null when the file passes every check. */
export async function validateImage(file: File, spec: ImageSpec): Promise<string | null> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Only JPG, PNG, or WebP images are allowed.'
  }
  if (file.size > MAX_BYTES) {
    return `Image is ${(file.size / 1024 / 1024).toFixed(1)} MB — maximum is 5 MB.`
  }
  let w: number, h: number
  try {
    ;({ w, h } = await readDimensions(file))
  } catch {
    return 'This file could not be read as an image.'
  }
  if (w < spec.minWidth || h < spec.minHeight) {
    return `Image is ${w}×${h} px — it needs to be at least ${spec.minWidth}×${spec.minHeight} px so it stays sharp.`
  }
  const ratio = w / h
  if (Math.abs(ratio - spec.aspect) / spec.aspect > spec.aspectTolerance) {
    return `Image shape doesn't fit this slot — use a ${spec.shape} image. Yours is ${w}×${h} px.`
  }
  return null
}

async function uploadImage(file: File, folder: string): Promise<{ url?: string; error?: string }> {
  if (!supabase) return { error: 'Supabase not configured' }
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '3600' })
  if (error) return { error: error.message }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl }
}

/**
 * Image picker with preview: validates type, 5 MB limit, and resolution
 * against `spec`, uploads to Supabase Storage, then reports the public URL.
 */
export function ImageUploadField({
  value,
  onChange,
  spec,
  folder,
  onUploadingChange,
}: {
  value: string
  onChange: (url: string) => void
  spec: ImageSpec
  folder: string
  onUploadingChange?: (uploading: boolean) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const setBusy = (b: boolean) => {
    setUploading(b)
    onUploadingChange?.(b)
  }

  const handleFile = async (file: File) => {
    setError('')
    const invalid = await validateImage(file, spec)
    if (invalid) {
      setError(invalid)
      return
    }
    setBusy(true)
    const result = await uploadImage(file, folder)
    setBusy(false)
    if (result.error) {
      setError(`Upload failed: ${result.error}`)
      return
    }
    if (result.url) onChange(result.url)
  }

  return (
    <div className="adm-upload">
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Preview"
          className="adm-upload-preview"
          style={{ aspectRatio: String(spec.aspect) }}
        />
      )}
      <button
        type="button"
        className="adm-btn-ghost"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? 'Uploading…' : value ? 'Replace image…' : 'Choose image…'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
      <div className="adm-upload-hint">
        JPG, PNG, or WebP · max 5 MB · {spec.shape} · min {spec.minWidth}×{spec.minHeight} px
      </div>
      {error && <div className="adm-error">{error}</div>}
    </div>
  )
}

/** Modal for images stored in site_content (e.g. the about photo). */
export function ImageEditModal({
  k,
  current,
  spec,
  folder,
  title,
  onClose,
}: {
  k: string
  current: string
  spec: ImageSpec
  folder: string
  title: string
  onClose: () => void
}) {
  const { set } = useContent()
  const [value, setValue] = useState(current)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const locked = saving || uploading

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const err = await set(k, value)
    setSaving(false)
    if (err) {
      setError(err)
      return
    }
    onClose()
  }

  return (
    <div className="adm-modal-overlay" onClick={() => !locked && onClose()}>
      <form className="adm-modal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
        <h3>{title}</h3>
        <ImageUploadField
          value={value}
          onChange={setValue}
          spec={spec}
          folder={folder}
          onUploadingChange={setUploading}
        />
        {error && <div className="adm-error">{error}</div>}
        <div className="adm-modal-actions">
          <button type="button" className="adm-btn-ghost" onClick={onClose} disabled={locked}>
            Cancel
          </button>
          <button
            type="submit"
            className="adm-btn-primary"
            disabled={locked || value === current}
          >
            {saving ? 'Saving…' : 'Update website'}
          </button>
        </div>
      </form>
    </div>
  )
}
