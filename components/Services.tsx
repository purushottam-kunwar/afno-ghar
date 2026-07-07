'use client'

import { useState } from 'react'
import { T } from './ContentProvider'
import { useAdmin } from './AdminProvider'
import { useCollection, ItemChips, ItemModal, AddCard } from './CollectionAdmin'
import { CollectionItem } from '@/lib/collections'

export default function Services() {
  const { isAdmin } = useAdmin()
  const services = useCollection('services')
  const [editing, setEditing] = useState<CollectionItem | null>(null)

  return (
    <section id="services">
      <div className="services-header reveal">
        <span className="section-tag">
          <T k="services.tag" d="What We Offer" />
        </span>
        <h2>
          <T k="services.title1" d="Complete" />{' '}
          <em><T k="services.title_accent" d="Services" /></em>{' '}
          <T k="services.title2" d="Under One Roof" />
        </h2>
        <div className="section-divider" />
        <p className="services-sub">
          <T
            k="services.sub"
            d="From design to handover — every service you need to build your dream home, delivered by qualified civil engineers."
            multiline
          />
        </p>
      </div>
      <div className="services-grid">
        {services.items.map((item, i) => (
          <div key={item.id ?? i} className="service-card">
            {isAdmin && item.id && (
              <ItemChips
                onEdit={() => setEditing(item)}
                onDelete={() => services.remove(item)}
                deleteLabel={`the "${item.data.title}" service`}
                disabled={services.busy}
              />
            )}
            <div className="service-icon">{item.data.icon}</div>
            <h3>{item.data.title}</h3>
            <p>{item.data.desc}</p>
          </div>
        ))}
        {isAdmin && <AddCard label="Add Service" onClick={() => setEditing({ data: {} })} />}
      </div>
      {editing && (
        <ItemModal
          collection="services"
          item={editing}
          onClose={() => setEditing(null)}
          onSave={services.save}
        />
      )}
    </section>
  )
}
