'use client'

import { T, useText } from './ContentProvider'

export default function CTA() {
  const phone = useText('contact.phone', '+977-9860648569')

  return (
    <section id="cta">
      <span className="section-tag">
        <T k="cta.tag" d="Take the Next Step" />
      </span>
      <h2 className="reveal">
        <T k="cta.title" d="Ready to Build Your" />
        <br />
        <em><T k="cta.title_accent" d="Dream Home?" /></em>
      </h2>
      <p className="reveal">
        <T
          k="cta.sub"
          d="Let our engineering team guide you from design to construction with complete trust, safety, and professionalism."
          multiline
        />
      </p>
      <div className="cta-btns reveal">
        <a href="#contact" className="btn-primary">
          <T k="cta.btn_primary" d="Contact Us Now" />
        </a>
        <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="btn-outline">
          <T k="cta.btn_secondary" d="Call Us Today" />
        </a>
      </div>
    </section>
  )
}
