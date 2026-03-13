import { useEffect, useState } from 'react'

/**
 * useSmoothScroll — tracks scroll progress (0–1) across the page
 * Also sets up scroll-triggered class reveals
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY]   = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el      = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total    = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? scrolled / total : 0)
      setScrollY(scrolled)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { progress, scrollY }
}

/**
 * useRevealOnScroll — adds .visible to elements with .reveal-up as they enter view
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-up')
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // stagger siblings
            const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal-up') || [])
            const idx = siblings.indexOf(entry.target)
            setTimeout(() => entry.target.classList.add('visible'), idx * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
