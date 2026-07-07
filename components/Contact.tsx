'use client'

import { useState, FormEvent } from 'react'
import { T, useText, EditChip } from './ContentProvider'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const phone = useText('contact.phone', '+977-9860648569')
  const whatsapp = useText('contact.whatsapp', '9779860648569')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch('https://formspree.io/f/meepklzz', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact">
      <div className="contact-grid">
        <div>
          <span className="section-tag">
            <T k="contact.tag" d="Get In Touch" />
          </span>
          <h2>
            <T k="contact.title" d="Let's Start Your" /><br />
            <em><T k="contact.title_accent" d="Project" /></em>
          </h2>
          <div className="section-divider" />
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <strong>Location</strong>
                <span><T k="contact.location" d="Naya Thimi, Bhaktapur, Nepal" /></span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <strong>Phone</strong>
                <span>
                  <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="contact-phone-link">
                    <T k="contact.phone" d="+977-9860648569" />
                  </a>
                </span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <strong>Email</strong>
                <span><T k="contact.email" d="support@afnoghar.com" /></span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">⏰</div>
              <div>
                <strong>Working Hours</strong>
                <span><T k="contact.hours" d="Sun – Fri: 9:00 AM – 6:00 PM" /></span>
              </div>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsapp}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20construction%20services.`}
            className="contact-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 <T k="contact.whatsapp_label" d="Chat on WhatsApp" />
          </a>
          <div className="adm-inline-chips">
            <EditChip k="contact.whatsapp" d="9779860648569" label="WhatsApp number" />
          </div>
        </div>

        <div className="contact-form reveal">
          <h3><T k="contact.form_title" d="Request a Free Consultation" /></h3>

          {status === 'success' ? (
            <div className="form-success">
              <div className="form-success-icon">✓</div>
              <strong>Message Sent!</strong>
              <span>We&apos;ll get back to you within 24 hours.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="form-error">
                  Something went wrong. Please try again or call us directly.
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
                  <option>Architectural Design</option>
                  <option>Structural Analysis</option>
                  <option>Building Construction</option>
                  <option>Site Supervision</option>
                  <option>Municipality Approval</option>
                  <option>Cost Estimation</option>
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
              <input type="text" name="_gotcha" className="honeypot" aria-hidden="true" title="Do not fill this field" tabIndex={-1} />
              <button type="submit" className="form-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
