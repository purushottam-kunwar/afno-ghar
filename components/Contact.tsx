'use client'

import { useState, FormEvent } from 'react'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/meepklzz', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact">
      <div className="contact-grid">
        <div>
          <span className="section-tag">Get In Touch</span>
          <h2>
            Let&apos;s Start Your<br />
            <em>Project</em>
          </h2>
          <div className="section-divider" />
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <strong>Location</strong>
                <span>Naya Thimi, Bhaktapur, Nepal</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <strong>Phone</strong>
                <span>+977-9860648569</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <strong>Email</strong>
                <span>support@afnoghar.com</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">⏰</div>
              <div>
                <strong>Working Hours</strong>
                <span>Sun – Fri: 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form reveal">
          <h3>Request a Free Consultation</h3>

          {status === 'success' ? (
            <div style={{
              background: 'rgba(82,183,136,0.15)',
              border: '1px solid rgba(82,183,136,0.4)',
              borderRadius: 6,
              padding: '20px 22px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>✓</div>
              <strong style={{ color: 'var(--green-light)', display: 'block', marginBottom: 4 }}>Message Sent!</strong>
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem' }}>
                We&apos;ll get back to you within 24 hours.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {status === 'error' && (
                <div style={{
                  background: 'rgba(220,80,80,0.12)',
                  border: '1px solid rgba(220,80,80,0.35)',
                  borderRadius: 6,
                  padding: '14px 18px',
                  marginBottom: 16,
                }}>
                  <span style={{ color: '#f08080', fontSize: '0.88rem' }}>
                    Something went wrong. Please try again or call us directly.
                  </span>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="+977-XXXXXXXXXX" required />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Needed</label>
                <select id="service" name="service">
                  <option>Building Design</option>
                  <option>Structural Analysis</option>
                  <option>Construction Services</option>
                  <option>Site Supervision</option>
                  <option>Interior Design</option>
                  <option>Full Project (Design + Build)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project — location, size, budget..."
                />
              </div>
              {/* Honeypot spam trap */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} />
              <button
                type="submit"
                className="form-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
