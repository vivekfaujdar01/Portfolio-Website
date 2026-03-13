import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'About',    href: '#about',    num: '01' },
  { label: 'Skills',   href: '#skills',   num: '02' },
  { label: 'Projects', href: '#projects', num: '03' },
  { label: 'Contact',  href: '#contact',  num: '04' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [activeSection, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracker
  useEffect(() => {
    const ids = ['about', 'skills', 'projects', 'contact']
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -40% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-theme py-3' : 'py-5'
        }`}
        style={{
          backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg) 80%, transparent)' : 'transparent',
          borderColor: 'var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="font-display font-bold text-2xl tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            <span className="text-gradient">VF</span>
            <span className="font-mono text-xs ml-1" style={{ color: 'var(--muted)' }}>{'</>'}</span>
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors duration-300 group flex items-center gap-1.5 ${
                    activeSection === link.href.slice(1) ? 'text-accent' : ''
                  }`}
                  style={{ color: activeSection === link.href.slice(1) ? '#5b6ef5' : 'var(--muted)' }}
                >
                  <span style={{ color: '#5b6ef5', opacity: 0.5 }}>{link.num}</span>
                  {link.label}
                  {/* Underline */}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-2 right-2 h-px"
                      style={{ background: '#5b6ef5' }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <motion.a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="border px-5 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                borderColor: '#5b6ef5',
                color: '#5b6ef5',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5b6ef5'; e.currentTarget.style.color = 'var(--bg)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5b6ef5' }}
            >
              Resume ↗
            </motion.a>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
                className="block w-5 h-px"
                style={{ background: 'var(--text)' }}
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
                className="block w-5 h-px"
                style={{ background: 'var(--text)' }}
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
                className="block w-5 h-px"
                style={{ background: 'var(--text)' }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 2rem) 2rem)' }}
            exit={{   opacity: 0, clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ background: 'var(--bg)' }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
                className="font-display font-bold text-4xl"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5b6ef5'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                <span className="font-mono text-sm" style={{ color: '#5b6ef5' }}>{link.num}.</span> {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
