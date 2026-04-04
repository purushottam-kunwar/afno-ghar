const projects = [
  {
    tag: 'Residential',
    title: 'Project Name — Kathmandu',
    desc: '3-storey residential building, fully supervised construction.',
  },
  {
    tag: 'Design + Build',
    title: 'Project Name — Lalitpur',
    desc: 'Modern 2-storey home with earthquake-resistant structure.',
  },
  {
    tag: 'Structural Design',
    title: 'Project Name — Bhaktapur',
    desc: 'Structural analysis and complete design for family residence.',
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="projects-header reveal">
        <span className="section-tag">Our Portfolio</span>
        <h2>Recent <em>Projects</em></h2>
        <div className="section-divider" />
        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', maxWidth: 500, lineHeight: 1.7 }}>
          Explore our completed residential projects — each reflecting our commitment to quality, design, and structural safety.
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.title} className="project-card reveal">
            <div className="project-img">Add project photo</div>
            <div className="project-info">
              <div className="project-tag">{p.tag}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
