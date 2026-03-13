import { personalInfo } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-muted">
          <span className="text-accent">Vivek Faujdar</span> · Built with React, Tailwind &amp; Framer Motion
        </div>
        <div className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} · Designed &amp; built by Vivek Faujdar
        </div>
        <a
          href="#home"
          className="font-mono text-xs text-muted hover:text-accent transition-colors border border-border px-3 py-1.5 hover:border-accent"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
