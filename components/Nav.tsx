'use client'

import { useState, useEffect } from 'react'
import { T } from './ContentProvider'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="nav-logo">
          <T k="brand.name" d="Afno Ghar" />
          <span><T k="brand.tagline" d="Consulting & Construction" /></span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta"><T k="nav.cta" d="Free Consultation" /></a>
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-close" onClick={closeMenu} aria-label="Close menu">✕</button>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#process" onClick={closeMenu}>Process</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a href="#contact" className="btn-primary" onClick={closeMenu}>Free Consultation</a>
      </div>
    </>
  )
}
