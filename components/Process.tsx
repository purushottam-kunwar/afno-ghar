const steps = [
  {
    num: '1',
    title: 'Consultation',
    desc: 'Understanding your requirements, vision, and budget in a free first meeting.',
  },
  {
    num: '2',
    title: 'Planning & Design',
    desc: 'Creating efficient, aesthetic 2D and 3D designs suited to your needs.',
  },
  {
    num: '3',
    title: 'Structural Analysis',
    desc: 'Ensuring complete safety and earthquake resistance per NBC standards.',
  },
  {
    num: '4',
    title: 'Construction',
    desc: 'Professional, monitored execution with skilled workers and quality materials.',
  },
  {
    num: '5',
    title: 'Final Handover',
    desc: 'Quality-checked, fully complete, and ready-to-move-in building delivered to you.',
  },
]

export default function Process() {
  return (
    <section id="process">
      <div className="process-wrap">
        <div className="reveal">
          <span className="section-tag">How We Work</span>
          <h2>Our Work <em>Process</em></h2>
          <div className="section-divider" />
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div key={s.num} className="step reveal">
              <div className="step-circle">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
