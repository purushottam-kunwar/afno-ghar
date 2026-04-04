const services = [
  {
    icon: '🏗️',
    title: 'Building Design',
    desc: 'Architectural planning with 2D & 3D house designs. Functional, modern layouts tailored to your lifestyle and budget.',
  },
  {
    icon: '📊',
    title: 'Structural Analysis',
    desc: 'Earthquake-resistant design, load calculations, and structural safety as per NBC / IS codes. Built to last.',
  },
  {
    icon: '👷',
    title: 'Construction Services',
    desc: 'Complete house construction with professional material management and skilled workforce execution from foundation to roof.',
  },
  {
    icon: '🔍',
    title: 'Site Supervision',
    desc: 'Regular site inspections, quality control of materials, and detailed progress tracking and reporting at every phase.',
  },
  {
    icon: '🛋️',
    title: 'Interior Design',
    desc: 'Space planning, modern interior concepts, and budget-friendly finishing solutions that make your home feel complete.',
  },
  {
    icon: '📐',
    title: 'Free Consultation',
    desc: 'Your first consultation is completely free. We listen to your requirements and guide you with an honest, transparent assessment.',
  },
]

export default function Services() {
  return (
    <section id="services">
      <div className="services-header reveal">
        <span className="section-tag">What We Offer</span>
        <h2>Our <em>Services</em></h2>
        <div className="section-divider" />
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
