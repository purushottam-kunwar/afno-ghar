import Image from 'next/image'

const projects = [
  {
    tag: 'Residential',
    title: '3-Storey Family Home — Kathmandu',
    desc: 'Earthquake-resistant RCC structure with modern facade. Full design, approval, and supervised construction.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    area: '2,400 sq.ft',
    storeys: '3 Storeys',
    status: 'Completed',
  },
  {
    tag: 'Design + Build',
    title: 'Modern Residence — Lalitpur',
    desc: 'Contemporary 2-storey home with open-plan living spaces and structural design per NBC standards.',
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    area: '1,800 sq.ft',
    storeys: '2 Storeys',
    status: 'Completed',
  },
  {
    tag: 'Structural Design',
    title: 'Family Residence — Bhaktapur',
    desc: 'Full structural analysis and NBC-compliant drawings for a 4-storey family residence. Municipality approved.',
    img: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=800&q=80',
    area: '3,100 sq.ft',
    storeys: '4 Storeys',
    status: 'Completed',
  },
  {
    tag: 'Commercial',
    title: 'Mixed-Use Building — Pokhara',
    desc: 'Ground-floor commercial units with residential floors above. Structural design, supervision, and handover.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    area: '4,200 sq.ft',
    storeys: '5 Storeys',
    status: 'Completed',
  },
  {
    tag: 'Renovation',
    title: 'Structural Reinforcement — Biratnagar',
    desc: 'Full structural assessment and reinforcement of an existing 2-storey home. Seismic retrofitting completed.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    area: '1,600 sq.ft',
    storeys: '2 Storeys',
    status: 'Completed',
  },
  {
    tag: 'Interior Design',
    title: 'Luxury Interior — Chitwan',
    desc: 'Complete interior design, space planning, and premium finishing for a newly constructed residence.',
    img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    area: '2,200 sq.ft',
    storeys: '2 Storeys',
    status: 'Completed',
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="projects-header reveal">
        <span className="section-tag">Our Portfolio</span>
        <h2>Recent <em>Projects</em></h2>
        <div className="section-divider" />
        <p className="projects-sub">
          Explore our completed residential and commercial projects — each reflecting our commitment to quality, design, and structural safety.
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.title} className="project-card reveal">
            <div className="project-img-wrap">
              <Image
                src={p.img}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="project-overlay">
                <span className="project-overlay-cta">View Project →</span>
              </div>
            </div>
            <div className="project-info">
              <div className="project-tag">{p.tag}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-meta">
                <span className="project-meta-item"><strong>{p.area}</strong> Built-up</span>
                <span className="project-meta-item"><strong>{p.storeys}</strong></span>
                <span className="project-meta-item"><strong>{p.status}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
