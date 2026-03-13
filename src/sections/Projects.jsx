import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/portfolio'
import { Github, ExternalLink, Terminal } from 'lucide-react'

export default function Projects() {
  const [ref, inView] = useInView(0.1)
  const [filter, setFilter] = useState('All')

  const featured  = projects.filter(p => p.featured)
  const others    = projects.filter(p => !p.featured)

  return (
    <section id="projects" ref={ref} className="py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-accent text-sm">03.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl">Projects</h2>
          <div className="flex-1 h-px bg-border ml-4 max-w-xs" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-muted font-mono text-sm mb-16 max-w-lg"
        >
          // Things I've built — from side projects to production apps
        </motion.p>

        {/* Featured projects */}
        <div className="space-y-8 mb-16">
          {featured.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* Other projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-mono text-sm text-muted uppercase tracking-widest mb-6">// Other projects</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {others.map((project, i) => (
              <SmallCard key={project.id} project={project} index={i} inView={inView} />
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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group bg-card border border-border hover:border-accent/30 transition-all duration-500 overflow-hidden"
    >
      <div className="grid md:grid-cols-2">
        {/* Preview area */}
        <div
          className="relative h-56 md:h-full min-h-[200px] flex items-center justify-center overflow-hidden"
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}10, transparent 70%)` }}
        >
          <div className="text-center">
            <Terminal size={32} style={{ color: project.accent }} className="mx-auto mb-3 opacity-60" />
            <span className="font-mono text-xs text-muted">
              {project.image ? '' : '// screenshot coming soon'}
            </span>
          </div>
          {/* Corner accent */}
          <div
            className="absolute top-0 left-0 w-16 h-16 opacity-20"
            style={{ background: `linear-gradient(135deg, ${project.accent}, transparent)` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: project.accent }}>
                Featured Project
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-text mb-1">{project.title}</h3>
            <p className="font-mono text-xs text-muted mb-4">{project.subtitle}</p>
            <p className="text-muted text-sm leading-relaxed">{project.description}</p>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mt-6 mb-5">
              {project.tech.map((t) => (
                <span key={t} className="font-mono text-xs text-muted border border-border px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href={project.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors">
                <Github size={14} /> Code
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors">
                  <ExternalLink size={14} /> Live Demo
                </a>
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
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-card border border-border hover:border-accent/30 p-6 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <Terminal size={22} style={{ color: project.accent }} className="opacity-70" />
        <div className="flex items-center gap-3">
          <a href={project.github} target="_blank" rel="noreferrer"
            className="text-muted hover:text-accent transition-colors">
            <Github size={16} />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer"
              className="text-muted hover:text-accent transition-colors">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-display font-bold text-text mb-1 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="font-mono text-xs text-muted mb-3">{project.subtitle}</p>
      <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="font-mono text-xs text-muted">{t}</span>
        ))}
        {project.tech.length > 3 && (
          <span className="font-mono text-xs text-border">+{project.tech.length - 3} more</span>
        )}
      </div>
    </motion.div>
  )
}
