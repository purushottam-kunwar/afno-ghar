'use client'

import { useEffect, useRef, useState } from 'react'
import { useAdmin } from './AdminProvider'
import { useCollection, ItemChips, ItemModal, AddCard } from './CollectionAdmin'
import { CollectionItem } from '@/lib/collections'

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const startTime = performance.now()
          const update = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(update)
          }
          requestAnimationFrame(update)
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="counter-num">
      {count}<span>{suffix}</span>
    </div>
  )
}

export default function Stats() {
  const { isAdmin } = useAdmin()
  const counters = useCollection('counters')
  const [editing, setEditing] = useState<CollectionItem | null>(null)

  return (
    <section id="stats">
      <div className="stats-inner">
        {counters.items.map((item, i) => (
          <div key={item.id ?? i} className="stat-counter-card">
            {isAdmin && item.id && (
              <ItemChips
                onEdit={() => setEditing(item)}
                onDelete={() => counters.remove(item)}
                deleteLabel={`the "${item.data.label}" counter`}
                disabled={counters.busy}
              />
            )}
            <Counter end={parseInt(item.data.end, 10) || 0} suffix={item.data.suffix ?? ''} />
            <div className="counter-label">{item.data.label}</div>
            <div className="counter-desc">{item.data.desc}</div>
          </div>
        ))}
        {isAdmin && <AddCard label="Add Counter" onClick={() => setEditing({ data: {} })} />}
      </div>
      {editing && (
        <ItemModal
          collection="counters"
          item={editing}
          onClose={() => setEditing(null)}
          onSave={counters.save}
        />
      )}
    </section>
  )
}
