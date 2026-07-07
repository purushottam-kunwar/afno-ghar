'use client'

import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Testimonial, fallbackTestimonials, initialsOf } from '@/lib/content'
import { useAdmin } from './AdminProvider'
import { T } from './ContentProvider'

const emptyTestimonial: Testimonial = {
  project_type: '',
  text: '',
  name: '',
  location: '',
}

export default function Testimonials() {
  const { isAdmin } = useAdmin()
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [saving, setSaving] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!supabase) return
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    if (!error && data) setTestimonials(data)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase || !editing) return
    setSaving(true)
    setError('')
    const { id, ...fields } = editing
    const result = id
      ? await supabase.from('testimonials').update(fields).eq('id', id)
      : await supabase
          .from('testimonials')
          .insert({ ...fields, sort_order: testimonials.length + 1 })
    setSaving(false)
    if (result.error) {
      setError(result.error.message)
      return
    }
    setEditing(null)
    await load()
  }

  const remove = async (t: Testimonial) => {
    if (!supabase || !t.id) return
    if (!window.confirm(`Delete the review by ${t.name}?`)) return
    setBusy(true)
    try {
      await supabase.from('testimonials').delete().eq('id', t.id)
      await load()
    } finally {
      setBusy(false)
    }
  }

  const field = (key: keyof Testimonial) => ({
    value: (editing?.[key] as string) ?? '',
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setEditing((prev) => prev && { ...prev, [key]: e.target.value }),
  })

  return (
    <section id="testimonials">
      <div className="testi-header reveal">
        <span className="section-tag"><T k="testimonials.tag" d="Client Reviews" /></span>
        <h2>
          <T k="testimonials.title" d="What Our Clients" />{' '}
          <em><T k="testimonials.title_accent" d="Say" /></em>
        </h2>
        <div className="section-divider" />
      </div>
      <div className="testi-grid">
        {testimonials.map((t) => (
          <div key={t.id ?? t.name} className="testi-card">
            {isAdmin && (
              <div className="adm-card-actions">
                <button type="button" className="adm-chip" onClick={() => setEditing(t)} disabled={busy}>✎ Edit</button>
                <button type="button" className="adm-chip adm-chip-danger" onClick={() => remove(t)} disabled={busy}>✕</button>
              </div>
            )}
            <span className="testi-project-type">{t.project_type}</span>
            <div className="testi-rating">
              <div className="stars">★★★★★</div>
              <span>5.0 / 5.0</span>
            </div>
            <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
            <div className="testi-author">
              <div className="testi-avatar">{initialsOf(t.name)}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-loc-project">{t.location}</div>
              </div>
            </div>
          </div>
        ))}
        {isAdmin && (
          <button
            type="button"
            className="adm-add-card"
            onClick={() => setEditing({ ...emptyTestimonial })}
          >
            <span className="adm-add-plus">+</span>
            Add Review
          </button>
        )}
      </div>

      {isAdmin && editing && (
        <div className="adm-modal-overlay" onClick={() => !saving && setEditing(null)}>
          <form
            className="adm-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={save}
          >
            <h3>{editing.id ? 'Edit Review' : 'Add Review'}</h3>
            <fieldset disabled={saving}>
            <label className="adm-label">Project type</label>
            <input className="adm-input" placeholder="3-Storey Residence · Kathmandu" required {...field('project_type')} />
            <label className="adm-label">Review text</label>
            <textarea className="adm-input" rows={4} required {...field('text')} />
            <div className="adm-row">
              <div>
                <label className="adm-label">Client name</label>
                <input className="adm-input" placeholder="Ram Kumar Shrestha" required {...field('name')} />
              </div>
              <div>
                <label className="adm-label">Location</label>
                <input className="adm-input" placeholder="Kathmandu" required {...field('location')} />
              </div>
            </div>
            </fieldset>
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
    </section>
  )
}
