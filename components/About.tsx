'use client'

import { useState } from 'react'
import { T, useText } from './ContentProvider'
import { useAdmin } from './AdminProvider'
import { useCollection, ItemModal, AddInline } from './CollectionAdmin'
import { ImageEditModal, IMAGE_SPECS } from './ImageUpload'
import { CollectionItem } from '@/lib/collections'

const DEFAULT_IMG =
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'

export default function About() {
  const { isAdmin } = useAdmin()
  const img = useText('about.img', DEFAULT_IMG)
  const trust = useCollection('about_trust')
  const [editing, setEditing] = useState<CollectionItem | null>(null)
  const [editingImg, setEditingImg] = useState(false)

  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-img-wrap reveal">
          <div className="about-img-frame">
            <img src={img} alt="Civil engineering team reviewing construction plans" />
            {isAdmin && (
              <div className="adm-card-actions">
                <button type="button" className="adm-chip" onClick={() => setEditingImg(true)}>
                  ✎ Image
                </button>
              </div>
            )}
          </div>
          <div className="about-badge">
            <strong><T k="about.badge_num" d="5+" /></strong>
            <small><T k="about.badge_label" d="Years of Experience" /></small>
          </div>
        </div>

        <div className="reveal">
          <span className="section-tag">
            <T k="about.tag" d="Who We Are" />
          </span>
          <h2>
            <T k="about.title" d="A Team of Passionate" /><br />
            <em><T k="about.title_accent" d="Civil Engineers" /></em>
          </h2>
          <div className="section-divider" />
          <p className="about-body-text">
            <T
              k="about.body"
              d="At Afno Ghar Consulting & Construction, we are committed to delivering safe, economical, and modern residential buildings. With hands-on experience in design, supervision, and construction, every project is executed with engineering accuracy and practical field knowledge."
              multiline
            />
          </p>
          <div className="about-philosophy">
            &ldquo;<T
              k="about.quote"
              d="We don't just build houses — we build safe homes where families grow."
              multiline
            />&rdquo;
          </div>
          <ul className="trust-list">
            {trust.items.map((item, i) => (
              <li key={item.id ?? i}>
                {item.data.label}
                {isAdmin && item.id && (
                  <span className="adm-inline-chips">
                    <button type="button" className="adm-mini" onClick={() => setEditing(item)} disabled={trust.busy}>✎</button>
                    <button
                      type="button"
                      className="adm-mini adm-mini-danger"
                      disabled={trust.busy}
                      onClick={() => {
                        if (window.confirm('Delete this checklist item?')) trust.remove(item)
                      }}
                    >
                      ✕
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ul>
          {isAdmin && <AddInline label="Add checklist item" onClick={() => setEditing({ data: {} })} />}
        </div>
      </div>
      {editing && (
        <ItemModal
          collection="about_trust"
          item={editing}
          onClose={() => setEditing(null)}
          onSave={trust.save}
        />
      )}
      {editingImg && (
        <ImageEditModal
          k="about.img"
          current={img}
          spec={IMAGE_SPECS.about}
          folder="about"
          title="About Photo"
          onClose={() => setEditingImg(false)}
        />
      )}
    </section>
  )
}
