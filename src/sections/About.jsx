import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { personalInfo, experience } from '../data/portfolio'
import { MapPin, Mail, Download } from 'lucide-react'

const fadeLeft  = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1] } } }
const fadeRight = { hidden: { opacity: 0, x:  50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1] } } }
const fadeUp    = { hidden: { opacity: 0, y:  30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } }

export default function About() {
  const [ref, inView] = useInView(0.12)

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden"
      style={{ background: 'var(--surface)' }}>
      <div className="absolute inset-0 dot-bg opacity-40" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-sm" style={{ color: '#5b6ef5' }}>01.</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            About Me
          </h2>
          <div className="flex-1 h-px max-w-xs ml-4" style={{ background: 'var(--border)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <motion.div variants={fadeLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            {/* Avatar */}
            <div className="mb-8 relative w-fit">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 flex items-center justify-center font-display font-bold text-5xl text-gradient accent-glow"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <img src="/avatar.jpg" alt="Vivek" className="w-28 h-28 object-cover object-top" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-3 -right-3 w-32 h-32 -z-10 opacity-30"
                style={{ border: '1px dashed #5b6ef5' }}
              />
            </div>

            {['Hey! I\'m Vivek Faujdar, a Computer Science student driven by a passion for building real things — not just learning about them.',
              'I enjoy the full journey of software: designing APIs, writing clean backend logic, and crafting UIs that feel snappy and intuitive. I\'m especially interested in system design, performance optimization, and writing code.',
              'Outside of code, I\'m grinding DSA problems, contributing to open source, and always looking for the next interesting project to build.'
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.7 }}
                className="mb-4 leading-relaxed"
                style={{ color: 'var(--muted)' }}
                dangerouslySetInnerHTML={{ __html: para.replace('system design', '<span style="color:#5b6ef5">system design</span>').replace('performance optimization', '<span style="color:#5b6ef5">performance optimization</span>') }}
              />
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-2.5 font-mono text-sm mt-6 mb-8"
              style={{ color: 'var(--muted)' }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: '#5b6ef5' }} />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: '#5b6ef5' }} />
                <a href={`mailto:${personalInfo.email}`}
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#5b6ef5'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                >
                  {personalInfo.email}
                </a>
              </div>
            </motion.div>

            <motion.a
              href={personalInfo.resumeUrl}
              target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-3 font-mono text-sm transition-all"
              style={{ border: '1px solid #5b6ef5', color: '#5b6ef5' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5b6ef5'; e.currentTarget.style.color = 'var(--bg)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5b6ef5' }}
            >
              <Download size={14} /> Download Resume
            </motion.a>
          </motion.div>

          {/* Right — timeline */}
          <motion.div variants={fadeRight} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--muted)' }}>
              // Education
            </p>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'var(--border)' }} />
              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  className="relative pl-8 pb-10 last:pb-0 group"
                >
                  <motion.div
                    className="absolute -left-1 top-2 w-2.5 h-2.5 rounded-full"
                    style={{ background: '#5b6ef5', boxShadow: '0 0 8px #5b6ef5' }}
                    whileHover={{ scale: 1.5 }}
                  />
                  {/* Connecting line glow on hover */}
                  <div className="font-mono text-xs mb-1" style={{ color: '#5b6ef5' }}>{item.year}</div>
                  <div className="font-display font-bold mb-0.5" style={{ color: 'var(--text)' }}>{item.role}</div>
                  <div className="font-mono text-sm mb-2" style={{ color: '#5b6ef5', opacity: 0.8 }}>{item.org}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
