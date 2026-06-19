export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-eyebrow">Kathmandu, Nepal</div>
          <h1>
            Build Your<br />
            Dream Home<br />
            <em>With Confidence</em>
          </h1>
          <p className="hero-sub">
            NBC-Compliant Design, Earthquake-Resistant Structures, Transparent Construction Process, and Professional Engineering Support — from foundation to handover.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">Get Free Consultation</a>
            <a href="#projects" className="btn-outline">View Projects</a>
          </div>
          <div className="trust-bar">
            <span className="trust-bar-item">NBC Compliant</span>
            <span className="trust-bar-item">Earthquake Resistant Design</span>
            <span className="trust-bar-item">Municipality Approval Support</span>
            <span className="trust-bar-item">Professional Civil Engineers</span>
            <span className="trust-bar-item">Transparent Cost Estimation</span>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-num">40<span>+</span></div>
            <div className="stat-label">Homes Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">100<span>+</span></div>
            <div className="stat-label">Structural Designs Delivered</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">1K<span>+</span></div>
            <div className="stat-label">Site Inspections Conducted</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">100<span>%</span></div>
            <div className="stat-label">NBC Compliance Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
