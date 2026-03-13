import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skills } from '../data/portfolio'

const categories = [...new Set(skills.map(s => s.category))]

const barColors = (level) =>
  level >= 85 ? '#5b6ef5' : level >= 75 ? '#06ffa5' : '#f59e0b'

export default function Skills() {
  const [ref, inView] = useInView(0.08)
  const [hovered, setHovered] = useState(null)

  return (
    <section id="skills" ref={ref} className="py-32 relative" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-sm" style={{ color: '#5b6ef5' }}>02.</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            Skills &amp; Stack
          </h2>
          <div className="flex-1 h-px max-w-xs ml-4" style={{ background: 'var(--border)' }} />
        </motion.div>

        <div className="space-y-14">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: ci * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{cat}</span>
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.filter(s => s.category === cat).map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: ci * 0.08 + si * 0.07 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onHoverStart={() => setHovered(skill.name)}
                    onHoverEnd={() => setHovered(null)}
                    className="p-4 transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: 'var(--surface)',
                      border: `1px solid ${hovered === skill.name ? '#5b6ef5' + '60' : 'var(--border)'}`,
                      boxShadow: hovered === skill.name ? '0 0 20px rgba(91,110,245,0.12)' : 'none',
                    }}
                  >
                    {/* Hover gradient bg */}
                    {hovered === skill.name && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(circle at top left, rgba(91,110,245,0.06), transparent 60%)' }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="font-display font-medium text-sm" style={{ color: 'var(--text)' }}>{skill.name}</span>
                      </div>
                      <span className="font-mono text-xs" style={{ color: barColors(skill.level) }}>{skill.level}%</span>
                    </div>

                    {/* Bar */}
                    <div className="h-0.5 overflow-hidden relative z-10" style={{ background: 'var(--border)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.4, delay: ci * 0.08 + si * 0.07 + 0.4, ease: [0.22,1,0.36,1] }}
                        style={{ height: '100%', background: barColors(skill.level),
                          boxShadow: `0 0 8px ${barColors(skill.level)}` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-16 pt-10"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="font-mono text-xs text-center mb-6" style={{ color: 'var(--muted)' }}>
            // tools I reach for daily
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['VS Code', 'Git', 'Docker', 'Postman', 'Figma', 'Linux', 'GitHub Actions', 'npm / yarn'].map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.05 }}
                whileHover={{ y: -3, borderColor: '#5b6ef5', color: '#5b6ef5' }}
                className="font-mono text-xs px-4 py-2 transition-all cursor-default"
                style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
