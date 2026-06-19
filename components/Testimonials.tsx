const testimonials = [
  {
    projectType: '3-Storey Residence · Kathmandu',
    text: 'Afno Ghar delivered our home exactly as planned. Their engineering knowledge and on-site supervision made us feel confident throughout. We knew exactly what was happening at every stage.',
    initials: 'RK',
    name: 'Ram Kumar Shrestha',
    location: 'Kathmandu',
  },
  {
    projectType: 'Design + Build · Lalitpur',
    text: 'Very professional team. They explained everything clearly, completed on time, and the construction quality is excellent. Our house passed inspection on the first attempt — no issues at all.',
    initials: 'SM',
    name: 'Sita Maharjan',
    location: 'Lalitpur',
  },
  {
    projectType: 'Structural Design · Bhaktapur',
    text: 'The structural drawings they provided gave us complete peace of mind during municipality approval. Transparent pricing and no hidden charges. A team that genuinely knows their engineering.',
    initials: 'BP',
    name: 'Bikram Poudel',
    location: 'Bhaktapur',
  },
  {
    projectType: 'Full Construction · Pokhara',
    text: 'From design to handover, everything was handled with great care. The engineer assigned to us was always available. The result exceeded what we had imagined.',
    initials: 'AK',
    name: 'Anita Karki',
    location: 'Pokhara',
  },
  {
    projectType: 'Commercial Building · Biratnagar',
    text: 'We hired Afno Ghar for our commercial project and they delivered outstanding results. Attention to detail, commitment to deadlines, and honest cost estimates throughout.',
    initials: 'NR',
    name: 'Nabin Rai',
    location: 'Biratnagar',
  },
  {
    projectType: 'Interior Design · Chitwan',
    text: 'The interior design team understood our vision perfectly. They transformed our house into a home we are truly proud of — on budget and without any compromise on quality.',
    initials: 'PS',
    name: 'Priya Shrestha',
    location: 'Chitwan',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="testi-header reveal">
        <span className="section-tag">Client Reviews</span>
        <h2>What Our Clients <em>Say</em></h2>
        <div className="section-divider" />
      </div>
      <div className="testi-grid">
        {testimonials.map((t) => (
          <div key={t.name} className="testi-card reveal">
            <span className="testi-project-type">{t.projectType}</span>
            <div className="testi-rating">
              <div className="stars">★★★★★</div>
              <span>5.0 / 5.0</span>
            </div>
            <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
            <div className="testi-author">
              <div className="testi-avatar">{t.initials}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-loc-project">{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
