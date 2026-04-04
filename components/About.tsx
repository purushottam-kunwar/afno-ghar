import Image from 'next/image'

export default function About() {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-img-wrap reveal">
          <div className="about-img-frame">
            <Image
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
              alt="Civil engineering team reviewing construction plans"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </div>
          <div className="about-badge">
            <strong>5+</strong>
            <small>Years of<br />Experience</small>
          </div>
        </div>

        <div className="reveal">
          <span className="section-tag">Who We Are</span>
          <h2>
            A Team of Passionate<br />
            <em>Civil Engineers</em>
          </h2>
          <div className="section-divider" />
          <p className="about-body-text">
            At Afno Ghar Consulting &amp; Construction, we are committed to delivering safe, economical, and modern residential buildings. With hands-on experience in design, supervision, and construction, every project is executed with engineering accuracy and practical field knowledge.
          </p>
          <div className="about-philosophy">
            &ldquo;We don&apos;t just build houses — we build safe homes where families grow.&rdquo;
          </div>
          <ul className="trust-list">
            <li>Engineering-based approach, not just contractors</li>
            <li>Transparency in work and communication at every stage</li>
            <li>Focus on safety, durability, and cost-efficiency</li>
            <li>On-site supervision and rigorous quality control</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
