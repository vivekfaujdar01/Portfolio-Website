import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/portfolio'
import { Github, ExternalLink, Terminal, Layers } from 'lucide-react'

export default function Projects() {
  const [ref, inView] = useInView(0.08)

  return (
    <section id="projects" ref={ref} className="py-32 relative" style={{ background: 'var(--surface)' }}>
      <div className="absolute inset-0 dot-bg opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-sm" style={{ color: '#5b6ef5' }}>03.</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            Projects
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
          // Things I've built — side projects to production apps
        </motion.p>

        {/* Featured */}
        <div className="space-y-6 mb-16">
          {projects.filter(p => p.featured).map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>

        {/* Others */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>
            // Other builds
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.filter(p => !p.featured).map((p, i) => (
              <SmallCard key={p.id} project={p} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedCard({ project, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.18, ease: [0.22,1,0.36,1] }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden transition-all duration-500"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = project.accent + '50'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div className="grid md:grid-cols-2">
        {/* Preview */}
        <div
          className="relative h-52 md:h-full min-h-[200px] flex items-center justify-center overflow-hidden"
          style={{ background: `radial-gradient(ellipse at 50% 50%, ${project.accent}12 0%, transparent 70%)` }}
        >
          {/* Animated grid */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${project.accent}08 1px, transparent 1px), linear-gradient(90deg, ${project.accent}08 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
            animate={{ backgroundPosition: ['0px 0px', '32px 32px'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <div className="text-center relative z-10">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Layers size={36} style={{ color: project.accent }} className="mx-auto mb-3 opacity-70" />
            </motion.div>
            <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
              {project.title}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: project.accent }}>
                ✦ Featured
              </span>
            </div>
            <h3 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text)' }}>{project.title}</h3>
            <p className="font-mono text-xs mb-4" style={{ color: 'var(--muted)' }}>{project.subtitle}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{project.description}</p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mt-5 mb-4">
              {project.tech.map(t => (
                <span key={t} className="font-mono text-xs px-2 py-0.5"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <motion.a href={project.github} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1.5 font-mono text-xs transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#5b6ef5'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                <Github size={14} /> Code
              </motion.a>
              {project.live && (
                <motion.a href={project.live} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-1.5 font-mono text-xs transition-colors"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = project.accent}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                >
                  <ExternalLink size={14} /> Live ↗
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SmallCard({ project, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.55 + index * 0.12 }}
      whileHover={{ y: -6 }}
      className="p-6 transition-all duration-300 group cursor-default"
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = project.accent + '50'; e.currentTarget.style.boxShadow = `0 8px 30px ${project.accent}12` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div className="flex items-start justify-between mb-4">
        <Terminal size={22} style={{ color: project.accent, opacity: 0.7 }} />
        <div className="flex items-center gap-3">
          <a href={project.github} target="_blank" rel="noreferrer"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#5b6ef5'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >
            <Github size={15} />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = project.accent}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-display font-bold mb-1 transition-colors" style={{ color: 'var(--text)' }}>
        {project.title}
      </h3>
      <p className="font-mono text-xs mb-3" style={{ color: 'var(--muted)' }}>{project.subtitle}</p>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map(t => (
          <span key={t} className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{t}</span>
        ))}
        {project.tech.length > 3 && (
          <span className="font-mono text-xs" style={{ color: 'var(--border)' }}>+{project.tech.length - 3}</span>
        )}
      </div>
    </motion.div>
  )
}
