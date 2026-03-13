import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

const navLinks = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-border' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="font-display font-bold text-xl tracking-wider">
            <span className="text-gradient">VF</span>
            <span className="text-muted font-mono text-sm ml-1">{'</>'}</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted hover:text-accent text-sm tracking-widest uppercase transition-colors duration-300 font-mono"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-accent text-accent px-4 py-2 text-xs tracking-widest uppercase font-mono hover:bg-accent hover:text-bg transition-all duration-300"
              >
                Resume ↗
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-6 h-px bg-text transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-text transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-text transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="font-display text-3xl font-bold text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="border border-accent text-accent px-6 py-3 font-mono text-sm tracking-wider"
            >
              Resume ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
