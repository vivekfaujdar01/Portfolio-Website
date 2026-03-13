import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { personalInfo, experience } from '../data/portfolio'
import { MapPin, Mail, Download } from 'lucide-react'

export default function About() {
  const [ref, inView] = useInView(0.15)

  return (
    <section id="about" ref={ref} className="py-32 bg-surface relative">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm">01.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl">About Me</h2>
          <div className="flex-1 h-px bg-border ml-4 max-w-xs" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Avatar placeholder */}
            <div className="mb-8 relative w-fit">
              <div className="w-28 h-28 bg-card border border-border flex items-center justify-center font-display font-extrabold text-4xl text-gradient">
                VF
              </div>
              {/* decorative corner */}
              <div className="absolute -bottom-2 -right-2 w-28 h-28 border border-accent/20 -z-10" />
            </div>

            <p className="text-muted leading-relaxed mb-4">
              Hey! I'm <span className="text-text font-medium">Vivek Faujdar</span>, a Computer Science student
              driven by a passion for building real things — not just learning about them.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              I enjoy the full journey of software: designing APIs, writing clean backend logic, and crafting
              UIs that feel snappy and intuitive. I'm especially interested in <span className="text-accent">system design</span>,
              <span className="text-accent"> performance optimization</span>, and writing code that other developers
              actually enjoy reading.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Outside of code, I'm grinding DSA problems, contributing to open source, and always looking for
              the next interesting project to build.
            </p>

            <div className="flex flex-col gap-2 font-mono text-sm text-muted mb-8">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-accent" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-accent transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-accent text-accent px-5 py-2.5 font-mono text-sm hover:bg-accent hover:text-bg transition-all"
            >
              <Download size={14} />
              Download Resume
            </a>
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-display font-bold text-xl mb-8 text-muted uppercase tracking-widest text-sm">
              // Experience &amp; Education
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  className="relative pl-8 pb-10 last:pb-0"
                >
                  {/* Dot */}
                  <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-accent" />

                  <div className="font-mono text-xs text-accent mb-1">{item.year}</div>
                  <div className="font-display font-bold text-text mb-0.5">{item.role}</div>
                  <div className="font-mono text-sm text-muted mb-2">{item.org}</div>
                  <div className="text-muted text-sm leading-relaxed">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
