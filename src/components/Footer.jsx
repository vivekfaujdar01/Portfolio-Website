import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="py-8" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
          <span className="text-gradient font-bold">Vivek Faujdar</span>
          {' · '}Built with React, Tailwind &amp; Framer Motion
        </div>
        <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
          © {new Date().getFullYear()} · All rights reserved
        </div>
        <motion.a
          href="#home"
          whileHover={{ y: -2, color: '#5b6ef5', borderColor: '#5b6ef5' }}
          className="font-mono text-xs px-3 py-1.5 transition-all"
          style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  )
}
