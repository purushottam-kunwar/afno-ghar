'use client'

import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Project, fallbackProjects } from '@/lib/content'
import { useAdmin } from './AdminProvider'
import { T } from './ContentProvider'
import { ImageUploadField, IMAGE_SPECS } from './ImageUpload'

const emptyProject: Project = {
  tag: '',
  title: '',
  description: '',
  img: '',
  area: '',
  storeys: '',
  status: 'Completed',
}

export default function Projects() {
  const { isAdmin } = useAdmin()
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const [editing, setEditing] = useState<Project | null>(null)
  const [saving, setSaving] = useState(false)
  const [busy, setBusy] = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!supabase) return
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    if (!error && data) setProjects(data)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase || !editing) return
    if (!editing.img) {
      setError('Please upload an image for this project.')
      return
    }
    setSaving(true)
    setError('')
    const { id, ...fields } = editing
    const result = id
      ? await supabase.from('projects').update(fields).eq('id', id)
      : await supabase
          .from('projects')
          .insert({ ...fields, sort_order: projects.length + 1 })
    setSaving(false)
    if (result.error) {
      setError(result.error.message)
      return
    }
    setEditing(null)
    await load()
  }

  const remove = async (p: Project) => {
    if (!supabase || !p.id) return
    if (!window.confirm(`Delete "${p.title}"? This removes it from the live site.`)) return
    setBusy(true)
    try {
      await supabase.from('projects').delete().eq('id', p.id)
      await load()
    } finally {
      setBusy(false)
    }
  }

  const field = (key: keyof Project) => ({
    value: (editing?.[key] as string) ?? '',
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setEditing((prev) => prev && { ...prev, [key]: e.target.value }),
  })

  return (
    <section id="projects">
      <div className="projects-header reveal">
        <span className="section-tag"><T k="projects.tag" d="Our Portfolio" /></span>
        <h2>
          <T k="projects.title" d="Recent" /> <em><T k="projects.title_accent" d="Projects" /></em>
        </h2>
        <div className="section-divider" />
        <p className="projects-sub">
          <T
            k="projects.sub"
            d="Explore our completed residential and commercial projects — each reflecting our commitment to quality, design, and structural safety."
            multiline
          />
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.id ?? p.title} className="project-card">
            {isAdmin && (
              <div className="adm-card-actions">
                <button type="button" className="adm-chip" onClick={() => setEditing(p)} disabled={busy}>✎ Edit</button>
                <button type="button" className="adm-chip adm-chip-danger" onClick={() => remove(p)} disabled={busy}>✕</button>
              </div>
            )}
            <div className="project-img-wrap">
              {/* Plain img: admins can use image URLs from any host */}
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className="project-overlay">
                <span className="project-overlay-cta">View Project →</span>
              </div>
            </div>
            <div className="project-info">
              <div className="project-tag">{p.tag}</div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="project-meta">
                <span className="project-meta-item">
                  <strong>{p.area}</strong> Built-up
                </span>
                <span className="project-meta-item">
                  <strong>{p.storeys}</strong>
                </span>
                <span className="project-meta-item">
                  <strong>{p.status}</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
        {isAdmin && (
          <button type="button" className="adm-add-card" onClick={() => setEditing({ ...emptyProject })}>
            <span className="adm-add-plus">+</span>
            Add Project
          </button>
        )}
      </div>

      {isAdmin && editing && (
        <div className="adm-modal-overlay" onClick={() => !saving && !uploadingImg && setEditing(null)}>
          <form
            className="adm-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={save}
          >
            <h3>{editing.id ? 'Edit Project' : 'Add Project'}</h3>
            <fieldset disabled={saving}>
            <label className="adm-label">Category tag</label>
            <input className="adm-input" placeholder="Residential" required {...field('tag')} />
            <label className="adm-label">Title</label>
            <input className="adm-input" placeholder="3-Storey Family Home — Kathmandu" required {...field('title')} />
            <label className="adm-label">Description</label>
            <textarea className="adm-input" rows={3} required {...field('description')} />
            <label className="adm-label">Image</label>
            <ImageUploadField
              value={editing.img}
              onChange={(url) => setEditing((prev) => prev && { ...prev, img: url })}
              spec={IMAGE_SPECS.project}
              folder="projects"
              onUploadingChange={setUploadingImg}
            />
            <div className="adm-row">
              <div>
                <label className="adm-label">Built-up area</label>
                <input className="adm-input" placeholder="2,400 sq.ft" {...field('area')} />
              </div>
              <div>
                <label className="adm-label">Storeys</label>
                <input className="adm-input" placeholder="3 Storeys" {...field('storeys')} />
              </div>
              <div>
                <label className="adm-label">Status</label>
                <input className="adm-input" placeholder="Completed" {...field('status')} />
              </div>
            </div>
            </fieldset>
            {error && <div className="adm-error">{error}</div>}
            <div className="adm-modal-actions">
              <button
                type="button"
                className="adm-btn-ghost"
                onClick={() => setEditing(null)}
                disabled={saving || uploadingImg}
              >
                Cancel
              </button>
              <button type="submit" className="adm-btn-primary" disabled={saving || uploadingImg}>
                {saving ? 'Saving…' : 'Update website'}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
