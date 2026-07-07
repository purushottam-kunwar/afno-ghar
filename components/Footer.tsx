'use client'

import { T, useText } from './ContentProvider'

export default function Footer() {
  const phone = useText('contact.phone', '+977-9860648569')
  const email = useText('contact.email', 'support@afnoghar.com')
  const whatsapp = useText('contact.whatsapp', '9779860648569')

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo"><T k="brand.name" d="Afno Ghar" /></div>
          <div className="footer-tagline"><T k="brand.tagline" d="Consulting & Construction" /></div>
          <p>
            <T
              k="footer.description"
              d="We design, engineer, and construct safe, earthquake-resistant homes across Nepal — with full transparency and professional support at every stage."
              multiline
            />
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">in</a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">W</a>
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
            <span className="footer-contact-text">
              <T k="contact.location" d="Naya Thimi, Bhaktapur, Nepal" />
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">📞</span>
            <span className="footer-contact-text">
              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
                <T k="contact.phone" d="+977-9860648569" />
              </a>
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">📧</span>
            <span className="footer-contact-text">
              <a href={`mailto:${email}`}>
                <T k="contact.email" d="support@afnoghar.com" />
              </a>
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon">⏰</span>
            <span className="footer-contact-text">
              <T k="footer.hours" d="Sun – Fri: 9 AM – 6 PM" />
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          &copy; <T k="footer.copyright" d="2025 Afno Ghar Consulting & Construction. All rights reserved." />
        </div>
        <div className="footer-bottom-links">
          <a href="#hero">Privacy Policy</a>
          <a href="#hero">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
