'use client'

import { useState } from 'react'
import { T } from './ContentProvider'
import { useAdmin } from './AdminProvider'
import { useCollection, ItemChips, ItemModal, AddCard } from './CollectionAdmin'
import { CollectionItem } from '@/lib/collections'

export default function WhyChooseUs() {
  const { isAdmin } = useAdmin()
  const reasons = useCollection('why_items')
  const [editing, setEditing] = useState<CollectionItem | null>(null)

  return (
    <section id="why">
      <div className="why-header reveal">
        <span className="section-tag">
          <T k="why.tag" d="Our Advantage" />
        </span>
        <h2>
          <T k="why.title" d="Why Homeowners" />{' '}
          <em><T k="why.title_accent" d="Trust Us" /></em>
        </h2>
        <div className="section-divider" />
        <p className="why-sub">
          <T
            k="why.sub"
            d="Building a home is the biggest investment of your life. Here's why hundreds of Nepali families choose Afno Ghar."
            multiline
          />
        </p>
      </div>
      <div className="why-grid">
        {reasons.items.map((item, i) => (
          <div key={item.id ?? i} className="why-item">
            {isAdmin && item.id && (
              <ItemChips
                onEdit={() => setEditing(item)}
                onDelete={() => reasons.remove(item)}
                deleteLabel={`the "${item.data.title}" card`}
                disabled={reasons.busy}
              />
            )}
            <div className="why-icon">{item.data.icon}</div>
            <div className="why-badge">{item.data.badge}</div>
            <h3>{item.data.title}</h3>
            <p>{item.data.desc}</p>
          </div>
        ))}
        {isAdmin && <AddCard label="Add Card" onClick={() => setEditing({ data: {} })} />}
      </div>
      {editing && (
        <ItemModal
          collection="why_items"
          item={editing}
          onClose={() => setEditing(null)}
          onSave={reasons.save}
        />
      )}
    </section>
  )
}
