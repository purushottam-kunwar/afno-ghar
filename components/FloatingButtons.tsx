'use client'

import { useEffect, useState } from 'react'
import { useText } from './ContentProvider'

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false)
  const phone = useText('contact.phone', '+977-9860648569')
  const whatsapp = useText('contact.whatsapp', '9779860648569')
  const tel = `tel:${phone.replace(/[^+\d]/g, '')}`
  const wa = `https://wa.me/${whatsapp}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20construction%20services.`

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <>
      <div className="floating-btns">
        <a
          href={wa}
          className="float-btn float-btn-wa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <span className="float-btn-label">Chat on WhatsApp</span>
          💬
        </a>
        <a
          href={tel}
          className="float-btn float-btn-call"
          aria-label="Call us now"
        >
          <span className="float-btn-label">Call Engineer Now</span>
          📞
        </a>
      </div>

      <div className="sticky-mobile-cta">
        <a href={tel} className="sticky-cta-call">
          📞 Call Engineer
        </a>
        <a
          href={wa}
          className="sticky-cta-wa"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 WhatsApp
        </a>
      </div>
    </>
  )
}
