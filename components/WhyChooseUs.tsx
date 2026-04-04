const reasons = [
  {
    num: '01',
    title: 'Engineering First Approach',
    desc: "We don't guess — we calculate, analyze, and build. Every decision is grounded in engineering science.",
  },
  {
    num: '02',
    title: 'Young & Energetic Team',
    desc: 'Modern thinking combined with updated engineering practices for better, smarter construction solutions.',
  },
  {
    num: '03',
    title: 'Strict Quality Assurance',
    desc: 'We supervise every stage — from material selection to final finishing — so nothing slips through.',
  },
  {
    num: '04',
    title: 'Cost Optimization',
    desc: 'We help you save money without ever compromising on structural integrity or material quality.',
  },
  {
    num: '05',
    title: 'Client Transparency',
    desc: 'Clear communication at every step. No hidden work, no surprises — just honest updates and results.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why">
      <div className="why-header reveal">
        <span className="section-tag">Our Advantage</span>
        <h2>Why Clients <em>Choose Us</em></h2>
        <div className="section-divider" />
      </div>
      <div className="why-grid">
        {reasons.map((r) => (
          <div key={r.num} className="why-item reveal">
            <div className="why-num">{r.num}</div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
