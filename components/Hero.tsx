'use client'

import { useState } from 'react'
import { T } from './ContentProvider'
import { useAdmin } from './AdminProvider'
import { useCollection, ItemChips, ItemModal, AddInline } from './CollectionAdmin'
import { CollectionItem } from '@/lib/collections'

export default function Hero() {
  const { isAdmin } = useAdmin()
  const stats = useCollection('hero_stats')
  const trust = useCollection('trust_bar')
  const [editingStat, setEditingStat] = useState<CollectionItem | null>(null)
  const [editingTrust, setEditingTrust] = useState<CollectionItem | null>(null)

  return (
    <section id="hero">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <T k="hero.eyebrow" d="Kathmandu, Nepal" />
          </div>
          <h1>
            <T k="hero.title1" d="Build Your" />
            <br />
            <T k="hero.title2" d="Dream Home" />
            <br />
            <em>
              <T k="hero.title_accent" d="With Confidence" />
            </em>
          </h1>
          <p className="hero-sub">
            <T
              k="hero.sub"
              d="NBC-Compliant Design, Earthquake-Resistant Structures, Transparent Construction Process, and Professional Engineering Support — from foundation to handover."
              multiline
            />
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">
              <T k="hero.btn_primary" d="Get Free Consultation" />
            </a>
            <a href="#projects" className="btn-outline">
              <T k="hero.btn_secondary" d="View Projects" />
            </a>
          </div>
          <div className="trust-bar">
            {trust.items.map((item, i) => (
              <span key={item.id ?? i} className="trust-bar-item">
                {item.data.label}
                {isAdmin && item.id && (
                  <span className="adm-inline-chips">
                    <button type="button" className="adm-mini" onClick={() => setEditingTrust(item)} disabled={trust.busy}>✎</button>
                    <button
                      type="button"
                      className="adm-mini adm-mini-danger"
                      disabled={trust.busy}
                      onClick={() => {
                        if (window.confirm(`Delete "${item.data.label}"?`)) trust.remove(item)
                      }}
                    >
                      ✕
                    </button>
                  </span>
                )}
              </span>
            ))}
            {isAdmin && <AddInline label="Add badge" onClick={() => setEditingTrust({ data: {} })} />}
          </div>
        </div>
        <div className="hero-stats">
          {stats.items.map((item, i) => (
            <div key={item.id ?? i} className="stat-card">
              {isAdmin && item.id && (
                <ItemChips
                  onEdit={() => setEditingStat(item)}
                  onDelete={() => stats.remove(item)}
                  deleteLabel={`the "${item.data.label}" stat`}
                  disabled={stats.busy}
                />
              )}
              <div className="stat-num">
                {item.data.num}
                <span>{item.data.suffix}</span>
              </div>
              <div className="stat-label">{item.data.label}</div>
            </div>
          ))}
          {isAdmin && (
            <button type="button" className="adm-add-card" onClick={() => setEditingStat({ data: {} })}>
              <span className="adm-add-plus">+</span>
              Add Stat
            </button>
          )}
        </div>
      </div>
      {editingStat && (
        <ItemModal
          collection="hero_stats"
          item={editingStat}
          onClose={() => setEditingStat(null)}
          onSave={stats.save}
        />
      )}
      {editingTrust && (
        <ItemModal
          collection="trust_bar"
          item={editingTrust}
          onClose={() => setEditingTrust(null)}
          onSave={trust.save}
        />
      )}
    </section>
  )
}
