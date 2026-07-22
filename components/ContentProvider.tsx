'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAdmin } from './AdminProvider'

interface EditTarget {
  key: string
  value: string
  multiline?: boolean
}

interface ContentContextValue {
  get: (key: string) => string | undefined
  edit: (target: EditTarget) => void
  /** Programmatic save (upsert). Returns an error message or null. */
  set: (key: string, value: string) => Promise<string | null>
}

const ContentContext = createContext<ContentContextValue>({
  get: () => undefined,
  edit: () => {},
  set: async () => 'Content provider not mounted',
})

export const useContent = () => useContext(ContentContext)

export default function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Record<string, string>>({})
  const [editing, setEditing] = useState<EditTarget | null>(null)
  const [draft, setDraft] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('site_content')
      .select('key, value')
      .then(({ data, error }) => {
        if (!error && data) {
          setContent(Object.fromEntries(data.map((r) => [r.key, r.value])))
        }
      })
  }, [])

  const edit = (target: EditTarget) => {
    setEditing(target)
    setDraft(target.value)
    setError('')
  }

  const set = async (key: string, value: string): Promise<string | null> => {
    if (!supabase) return 'Supabase not configured'
    const { error } = await supabase
      .from('site_content')
      .upsert({ key, value, updated_at: new Date().toISOString() })
    if (error) return error.message
    setContent((prev) => ({ ...prev, [key]: value }))
    return null
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    const err = await set(editing.key, draft)
    setSaving(false)
    if (err) {
      setError(err)
      return
    }
    setEditing(null)
  }

  return (
    <ContentContext.Provider value={{ get: (k) => content[k], edit, set }}>
      {children}
      {editing && (
        <div className="adm-modal-overlay" onClick={() => !saving && setEditing(null)}>
          <form className="adm-modal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <h3>Edit Text</h3>
            <label className="adm-label" htmlFor="adm-text-editor">{editing.key}</label>
            {editing.multiline ? (
              <textarea
                id="adm-text-editor"
                className="adm-input"
                rows={5}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                disabled={saving}
                autoFocus
              />
            ) : (
              <input
                id="adm-text-editor"
                className="adm-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                disabled={saving}
                autoFocus
              />
            )}
            {error && <div className="adm-error">{error}</div>}
            <div className="adm-modal-actions">
              <button
                type="button"
                className="adm-btn-ghost"
                onClick={() => setEditing(null)}
                disabled={saving}
              >
                Cancel
              </button>
              <button type="submit" className="adm-btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Update website'}
              </button>
            </div>
          </form>
        </div>
      )}
    </ContentContext.Provider>
  )
}

/**
 * Editable text. Renders the stored value (or the default `d`).
 * In admin mode it becomes click-to-edit.
 */
export function T({ k, d, multiline }: { k: string; d: string; multiline?: boolean }) {
  const { isAdmin } = useAdmin()
  const { get, edit } = useContent()
  const value = get(k) ?? d
  if (!isAdmin) return <>{value}</>
  return (
    <span
      className="adm-editable"
      role="button"
      tabIndex={0}
      title={`Edit: ${k}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        edit({ key: k, value, multiline })
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          e.stopPropagation()
          edit({ key: k, value, multiline })
        }
      }}
    >
      {value}
    </span>
  )
}

/** Hook version for values used in attributes (image src, tel/wa links). */
export function useText(k: string, d: string): string {
  const { get } = useContent()
  return get(k) ?? d
}

/** Small admin-only chip that opens the text editor for a key (for non-visible values like URLs). */
export function EditChip({ k, d, label }: { k: string; d: string; label: string }) {
  const { isAdmin } = useAdmin()
  const { get, edit } = useContent()
  if (!isAdmin) return null
  return (
    <button
      type="button"
      className="adm-chip"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        edit({ key: k, value: get(k) ?? d })
      }}
    >
      ✎ {label}
    </button>
  )
}
