'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { end: 40, suffix: '+', label: 'Homes Completed', desc: 'Residential buildings across Nepal' },
  { end: 100, suffix: '+', label: 'Structural Designs', desc: 'NBC-compliant engineering drawings' },
  { end: 1000, suffix: '+', label: 'Site Inspections', desc: 'Quality control visits conducted' },
  { end: 100, suffix: '%', label: 'NBC Compliance', desc: 'Every project meets national standards' },
]

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
  return (
    <section id="stats">
      <div className="stats-inner">
        {stats.map((s) => (
          <div key={s.label} className="stat-counter-card reveal">
            <Counter end={s.end} suffix={s.suffix} />
            <div className="counter-label">{s.label}</div>
            <div className="counter-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
