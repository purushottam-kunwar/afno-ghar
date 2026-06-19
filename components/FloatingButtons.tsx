'use client'

import { useEffect, useState } from 'react'

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false)

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
          href="https://wa.me/9779860648569?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20construction%20services."
          className="float-btn float-btn-wa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <span className="float-btn-label">Chat on WhatsApp</span>
          💬
        </a>
        <a
          href="tel:+9779860648569"
          className="float-btn float-btn-call"
          aria-label="Call us now"
        >
          <span className="float-btn-label">Call Engineer Now</span>
          📞
        </a>
      </div>

      <div className="sticky-mobile-cta">
        <a href="tel:+9779860648569" className="sticky-cta-call">
          📞 Call Engineer
        </a>
        <a
          href="https://wa.me/9779860648569?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20construction%20services."
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
