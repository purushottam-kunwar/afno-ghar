const steps = [
  {
    num: '01',
    timeline: 'Day 1',
    title: 'Free Consultation',
    desc: 'We listen to your vision, requirements, and budget in a free first meeting — online or at your site.',
    deliverable: 'Project feasibility assessment',
  },
  {
    num: '02',
    timeline: 'Day 2–4',
    title: 'Site Visit & Survey',
    desc: 'Our engineers visit your land, conduct soil assessment, take measurements, and evaluate site conditions.',
    deliverable: 'Site survey report',
  },
  {
    num: '03',
    timeline: 'Week 1–3',
    title: 'Design & Drawings',
    desc: 'We create architectural floor plans, 3D visualizations, and complete structural engineering drawings.',
    deliverable: 'Full architectural + structural drawings',
  },
  {
    num: '04',
    timeline: 'Week 3–6',
    title: 'Municipality Approval',
    desc: 'We prepare and submit all technical documents for your building permit on your behalf.',
    deliverable: 'Approved building permit',
  },
  {
    num: '05',
    timeline: 'Month 2–14',
    title: 'Construction',
    desc: 'Professional construction with supervised execution — foundation, columns, slabs, brickwork, and finishing.',
    deliverable: 'Fully constructed building',
  },
  {
    num: '06',
    timeline: 'Final Week',
    title: 'Handover',
    desc: 'Final quality inspection, snag list resolution, and formal handover with all documentation.',
    deliverable: 'Keys + as-built drawings + warranty',
  },
]

export default function Process() {
  return (
    <section id="process">
      <div className="process-wrap">
        <div className="reveal">
          <span className="section-tag">How We Work</span>
          <h2>Your Home, <em>Step by Step</em></h2>
          <div className="section-divider" />
          <p className="process-sub">
            A transparent, structured process so you always know what happens next — and when.
          </p>
        </div>
        <div className="steps-v2">
          {steps.map((s) => (
            <div key={s.num} className="step-v2 reveal">
              <div className="step-v2-num">{s.num}</div>
              <div className="step-v2-timeline">{s.timeline}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="step-v2-deliverable">{s.deliverable}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
