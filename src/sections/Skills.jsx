import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skills } from '../data/portfolio'

const categories = [...new Set(skills.map(s => s.category))]

export default function Skills() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="skills" ref={ref} className="py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm">02.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl">Skills &amp; Stack</h2>
          <div className="flex-1 h-px bg-border ml-4 max-w-xs" />
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-muted uppercase tracking-widest">{cat}</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.filter(s => s.category === cat).map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: ci * 0.1 + si * 0.06 }}
                    whileHover={{ y: -2 }}
                    className="bg-surface border border-border p-4 group hover:border-accent/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="font-display font-medium text-sm text-text">{skill.name}</span>
                      </div>
                      <span className="font-mono text-xs text-muted">{skill.level}%</span>
                    </div>

                    {/* Skill bar */}
                    <div className="h-0.5 bg-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.2, delay: ci * 0.1 + si * 0.06 + 0.3, ease: 'easeOut' }}
                        className="h-full"
                        style={{
                          background: skill.level >= 85
                            ? '#00d4ff'
                            : skill.level >= 75
                            ? '#39d353'
                            : '#ffa657'
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech icons row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="font-mono text-xs text-muted text-center mb-6">// tools I use daily</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['VS Code', 'Git', 'Docker', 'Postman', 'Figma', 'Linux', 'GitHub Actions', 'npm'].map((tool) => (
              <span
                key={tool}
                className="font-mono text-xs border border-border text-muted px-3 py-1.5 hover:border-accent hover:text-accent transition-all duration-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
