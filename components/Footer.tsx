export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">Afno Ghar</div>
          <div className="footer-tagline">Consulting &amp; Construction</div>
          <p>
            We design, engineer, and construct safe, earthquake-resistant homes across Nepal — with full transparency and professional support at every stage.
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">in</a>
            <a href="https://wa.me/9779860648569" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">W</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Services</div>
          <ul>
            <li><a href="#services">Architectural Design</a></li>
            <li><a href="#services">Structural Analysis</a></li>
            <li><a href="#services">Building Construction</a></li>
            <li><a href="#services">Site Supervision</a></li>
            <li><a href="#services">Municipality Approval</a></li>
            <li><a href="#services">Cost Estimation</a></li>
            <li><a href="#services">Interior Design</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Company</div>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#process">Our Process</a></li>
            <li><a href="#projects">Portfolio</a></li>
            <li><a href="#testimonials">Client Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Contact</div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">📍</span>
            <span className="footer-contact-text">Naya Thimi, Bhaktapur, Nepal</span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">📞</span>
            <span className="footer-contact-text">
              <a href="tel:+9779860648569">+977-9860648569</a>
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">📧</span>
            <span className="footer-contact-text">
              <a href="mailto:support@afnoghar.com">support@afnoghar.com</a>
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">⏰</span>
            <span className="footer-contact-text">Sun – Fri: 9 AM – 6 PM</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          &copy; 2025 Afno Ghar Consulting &amp; Construction. All rights reserved.
        </div>
        <div className="footer-bottom-links">
          <a href="#hero">Privacy Policy</a>
          <a href="#hero">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
