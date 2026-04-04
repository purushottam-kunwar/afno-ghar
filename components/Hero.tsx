export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-eyebrow">Kathmandu, Nepal</div>
          <h1>
            Engineering<br />
            <em>Trust.</em><br />
            Building Your Future.
          </h1>
          <p className="hero-sub">
            We design, analyze, and construct high-quality residential buildings with precision, safety, and complete transparency.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">Get Free Consultation</a>
            <a href="#projects" className="btn-outline">View Our Projects</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-num">40<span>+</span></div>
            <div className="stat-label">Residential Buildings Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">100<span>+</span></div>
            <div className="stat-label">Designs Delivered</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">NBC</div>
            <div className="stat-label">Standard Compliant Designs</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">100<span>%</span></div>
            <div className="stat-label">Client Transparency</div>
          </div>
        </div>
      </div>
    </section>
  )
}
