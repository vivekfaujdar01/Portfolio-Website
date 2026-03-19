import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { certifications } from '../data/portfolio'
import { Award, ExternalLink } from 'lucide-react'

export default function Certifications() {
  const [ref, inView] = useInView(0.08)

  return (
    <section id="certifications" ref={ref} className="py-32 relative" style={{ background: 'var(--bg)' }}>
      {/* Background decoration */ }
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none"
           style={{ background: 'radial-gradient(circle at 70% 50%, var(--accent), transparent 60%)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-sm" style={{ color: '#5b6ef5' }}>05.</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            Certificates
          </h2>
          <div className="flex-1 h-px max-w-xs ml-4" style={{ background: 'var(--border)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="font-mono text-sm mb-16"
          style={{ color: 'var(--muted)' }}
        >
          // Validated skills and credentials
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.id} cert={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificationCard({ cert, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="p-8 group relative overflow-hidden transition-all duration-500"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = cert.accent + '60'
        e.currentTarget.style.boxShadow = `0 10px 40px -10px ${cert.accent}20`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Background gradient on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${cert.accent}, transparent)` }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div 
            className="p-3 rounded-lg"
            style={{ background: `${cert.accent}15` }}
          >
            <Award size={28} style={{ color: cert.accent }} />
          </div>
          <a
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="p-2 transition-colors cursor-pointer"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = cert.accent}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            aria-label={`View ${cert.title} Certificate`}
          >
            <ExternalLink size={20} />
          </a>
        </div>

        <div className="mb-4">
          <h3 className="font-display font-bold text-2xl mb-1 transition-colors" style={{ color: 'var(--text)' }}>
            {cert.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 font-mono text-sm" style={{ color: 'var(--muted)' }}>
            <span style={{ color: cert.accent }}>{cert.issuer}</span>
            <span className="opacity-50">•</span>
            <span>{cert.date}</span>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: 'var(--muted)' }}>
          {cert.description}
        </p>
      </div>
    </motion.div>
  )
}
