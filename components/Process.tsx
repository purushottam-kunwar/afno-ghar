'use client'

import { useState } from 'react'
import { T } from './ContentProvider'
import { useAdmin } from './AdminProvider'
import { useCollection, ItemChips, ItemModal, AddCard } from './CollectionAdmin'
import { CollectionItem } from '@/lib/collections'

export default function Process() {
  const { isAdmin } = useAdmin()
  const steps = useCollection('process_steps')
  const [editing, setEditing] = useState<CollectionItem | null>(null)

  return (
    <section id="process">
      <div className="process-wrap">
        <div className="reveal">
          <span className="section-tag">
            <T k="process.tag" d="How We Work" />
          </span>
          <h2>
            <T k="process.title" d="Your Home," />{' '}
            <em><T k="process.title_accent" d="Step by Step" /></em>
          </h2>
          <div className="section-divider" />
          <p className="process-sub">
            <T
              k="process.sub"
              d="A transparent, structured process so you always know what happens next — and when."
              multiline
            />
          </p>
        </div>
        <div className="steps-v2">
          {steps.items.map((item, i) => (
            <div key={item.id ?? i} className="step-v2">
              {isAdmin && item.id && (
                <ItemChips
                  onEdit={() => setEditing(item)}
                  onDelete={() => steps.remove(item)}
                  deleteLabel={`step "${item.data.title}"`}
                  disabled={steps.busy}
                />
              )}
              <div className="step-v2-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="step-v2-timeline">{item.data.timeline}</div>
              <h3>{item.data.title}</h3>
              <p>{item.data.desc}</p>
              <div className="step-v2-deliverable">{item.data.deliverable}</div>
            </div>
          ))}
          {isAdmin && <AddCard label="Add Step" onClick={() => setEditing({ data: {} })} />}
        </div>
      </div>
      {editing && (
        <ItemModal
          collection="process_steps"
          item={editing}
          onClose={() => setEditing(null)}
          onSave={steps.save}
        />
      )}
    </section>
  )
}
