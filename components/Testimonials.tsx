const testimonials = [
  {
    text: 'Afno Ghar team delivered our house exactly as planned. Their engineering knowledge and supervision made us feel confident throughout the entire project. Highly recommended!',
    initials: 'RK',
    name: 'Ram Kumar Shrestha',
    location: 'Kathmandu',
  },
  {
    text: 'Very professional team. They explained everything clearly, finished on time, and the quality of construction is excellent. We are very happy with our new home.',
    initials: 'SM',
    name: 'Sita Maharjan',
    location: 'Lalitpur',
  },
  {
    text: 'The structural design they provided gave us complete peace of mind. Transparent pricing, no surprises. A trustworthy team that really knows their engineering.',
    initials: 'BP',
    name: 'Bikram Poudel',
    location: 'Bhaktapur',
  },
  {
    text: 'From design to handover, everything was handled with great care. The team was always available to answer our questions and the final result exceeded our expectations.',
    initials: 'AK',
    name: 'Anita Karki',
    location: 'Pokhara',
  },
  {
    text: 'We hired Afno Ghar for our commercial project and they delivered outstanding results. Their attention to detail and commitment to deadlines is truly commendable.',
    initials: 'NR',
    name: 'Nabin Rai',
    location: 'Biratnagar',
  },
  {
    text: 'Excellent service from start to finish. The interior design team understood our vision perfectly and transformed our home into something we are truly proud of.',
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
            <div className="stars">★★★★★</div>
            <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
            <div className="testi-author">
              <div className="testi-avatar">{t.initials}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-loc">{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
