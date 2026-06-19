const services = [
  {
    icon: '🏛',
    title: 'Architectural Design',
    desc: 'Custom 2D floor plans and 3D visualizations tailored to your lifestyle, plot size, and budget. See your home before a single brick is laid.',
  },
  {
    icon: '📊',
    title: 'Structural Analysis',
    desc: 'Earthquake-resistant design with full load calculations per NBC and IS codes. Your building is engineered to protect your family for decades.',
  },
  {
    icon: '🏗',
    title: 'Building Construction',
    desc: 'End-to-end construction with professional material management, certified workforce, and strict quality checks from foundation to finishing.',
  },
  {
    icon: '🔍',
    title: 'Site Supervision',
    desc: 'Regular on-site inspections, material quality verification, and detailed progress reports — so you always know exactly where your project stands.',
  },
  {
    icon: '📋',
    title: 'Municipality Approval',
    desc: 'We prepare and submit all technical drawings and documents required for building permit approval. Hassle-free, compliant, and fast.',
  },
  {
    icon: '💰',
    title: 'Cost Estimation',
    desc: 'Accurate, itemized cost breakdowns before construction starts. No hidden charges. Plan your budget with complete confidence.',
  },
  {
    icon: '🛋',
    title: 'Interior Design',
    desc: 'Space planning, material selection, and modern finishing concepts that make every room feel exactly the way you imagined it.',
  },
]

export default function Services() {
  return (
    <section id="services">
      <div className="services-header reveal">
        <span className="section-tag">What We Offer</span>
        <h2>Complete <em>Services</em> Under One Roof</h2>
        <div className="section-divider" />
        <p className="services-sub">
          From design to handover — every service you need to build your dream home, delivered by qualified civil engineers.
        </p>
      </div>
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.title} className="service-card reveal">
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
