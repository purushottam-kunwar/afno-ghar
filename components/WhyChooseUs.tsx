const reasons = [
  {
    icon: '🛡',
    badge: 'Safety',
    title: 'Safety First, Always',
    desc: 'Every structure we design is earthquake-resistant and fully NBC-compliant. Your family\'s safety is never negotiated — it is engineered.',
  },
  {
    icon: '📐',
    badge: 'Precision',
    title: 'Engineering Precision',
    desc: 'We calculate, analyze, and verify — no guesswork. Load calculations, structural analysis, and field checks at every stage.',
  },
  {
    icon: '💰',
    badge: 'Transparency',
    title: 'Transparent Budgeting',
    desc: 'You receive a detailed cost breakdown before construction begins. No hidden charges, no last-minute surprises — just honest numbers.',
  },
  {
    icon: '🏗',
    badge: 'Quality',
    title: 'Quality Construction',
    desc: 'Premium materials, certified workers, and strict quality checks at foundation, column, slab, and finishing stages.',
  },
  {
    icon: '📞',
    badge: 'Support',
    title: 'Dedicated Project Support',
    desc: 'A dedicated engineer is assigned to your project. Get real-time updates, progress reports, and answers whenever you need them.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why">
      <div className="why-header reveal">
        <span className="section-tag">Our Advantage</span>
        <h2>Why Homeowners <em>Trust Us</em></h2>
        <div className="section-divider" />
        <p className="why-sub">
          Building a home is the biggest investment of your life. Here&apos;s why hundreds of Nepali families choose Afno Ghar.
        </p>
      </div>
      <div className="why-grid">
        {reasons.map((r) => (
          <div key={r.badge} className="why-item reveal">
            <div className="why-icon">{r.icon}</div>
            <div className="why-badge">{r.badge}</div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
