'use client'

import { useEffect } from 'react'

export default function ScrollRevealInit() {
  useEffect(() => {
    document.body.classList.add('js-ready')

    const reveals = document.querySelectorAll<HTMLElement>('.reveal')
    const fallback = setTimeout(() => reveals.forEach(el => el.classList.add('visible')), 1500)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80)
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    )

    reveals.forEach(el => observer.observe(el))

    return () => {
      clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])

  return null
}
