import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { personalInfo, stats } from '../data/portfolio'
import { Github, Linkedin, Twitter, ArrowDown } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const ROLES = [
  "Full Stack Developer",
  "React Enthusiast",
  "Backend Engineer",
  "Open Source Contributor",
]

function TypingText() {
  const [displayed, setDisplayed] = useState('')
  const [roleIdx, setRoleIdx]     = useState(0)
  const [charIdx, setCharIdx]     = useState(0)
  const [deleting, setDeleting]   = useState(false)
  const [paused, setPaused]       = useState(false)

  useEffect(() => {
    if (paused) return
    const current = ROLES[roleIdx]
    const speed   = deleting ? 35 : 75

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = charIdx + 1
        setDisplayed(current.slice(0, next))
        if (next === current.length) {
          setPaused(true)
          setTimeout(() => { setDeleting(true); setPaused(false) }, 1800)
        } else {
          setCharIdx(next)
        }
      } else {
        const next = charIdx - 1
        setDisplayed(current.slice(0, next))
        if (next === 0) {
          setDeleting(false)
          setCharIdx(0)
          setRoleIdx(r => (r + 1) % ROLES.length)
        } else {
          setCharIdx(next)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, roleIdx, paused])

  return (
    <span>
      <span className="text-text">{displayed}</span>
      <span className="cursor-blink text-accent ml-0.5">|</span>
    </span>
  )
}

function CodeCard() {
  return (
    <div className="bg-surface border border-border overflow-hidden glow">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
        <span className="w-3 h-3 rounded-full bg-red-500/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span className="w-3 h-3 rounded-full bg-green/60" />
        <span className="font-mono text-xs text-muted ml-2">vivek.config.js</span>
        <span className="ml-auto w-2 h-2 rounded-full bg-green/60 animate-pulse" title="online" />
      </div>
      <div className="p-6 font-mono text-sm leading-7">
        <p><span className="text-[#79c0ff]">const</span> <span className="text-[#ffa657]">developer</span> <span className="text-text">= {'{'}</span></p>
        <p className="pl-4"><span className="text-[#7ee787]">name</span><span className="text-text">: </span><span className="text-[#a5d6ff]">"Vivek Faujdar"</span><span className="text-text">,</span></p>
        <p className="pl-4"><span className="text-[#7ee787]">role</span><span className="text-text">: </span><span className="text-[#a5d6ff]">"Full Stack Developer"</span><span className="text-text">,</span></p>
        <p className="pl-4"><span className="text-[#7ee787]">stack</span><span className="text-text">: [</span></p>
        <p className="pl-8"><span className="text-[#a5d6ff]">"React"</span><span className="text-text">, </span><span className="text-[#a5d6ff]">"Node.js"</span><span className="text-text">,</span></p>
        <p className="pl-8"><span className="text-[#a5d6ff]">"Java"</span><span className="text-text">, </span><span className="text-[#a5d6ff]">"Docker"</span><span className="text-text">,</span></p>
        <p className="pl-8"><span className="text-[#a5d6ff]">"MongoDB"</span><span className="text-text">, </span><span className="text-[#a5d6ff]">"PostgreSQL"</span></p>
        <p className="pl-4"><span className="text-text">],</span></p>
        <p className="pl-4"><span className="text-[#7ee787]">hardWorking</span><span className="text-text">: </span><span className="text-[#79c0ff]">true</span><span className="text-text">,</span></p>
        <p className="pl-4"><span className="text-[#7ee787]">available</span><span className="text-text">: </span><span className="text-[#79c0ff]">true</span></p>
        <p><span className="text-text">{'}'}</span></p>
        <p className="mt-2">
          <span className="text-[#79c0ff]">export default</span>
          <span className="text-text"> developer</span>
          <span className="cursor-blink text-accent">_</span>
        </p>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center grid-bg overflow-hidden pt-20">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green/4 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-28 right-10 font-mono text-xs text-border/50 leading-6 hidden xl:block select-none">
        {['// vivek-portfolio v1.0', 'import { passion } from "./heart"', 'import { skills } from "./brain"'].map((l, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-border/30 w-4 text-right">{i + 1}</span>
            <span>{l}</span>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full py-24">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3">
            <motion.div {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2 mb-8 font-mono text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              <span className="text-muted">Open to internships &amp; projects</span>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <p className="font-mono text-accent text-sm tracking-widest mb-3">{'> Hello, world! I\'m'}</p>
              <h1 className="font-display font-extrabold leading-none tracking-tight">
                <span className="text-text text-6xl md:text-8xl block">Vivek</span>
                <span className="text-gradient text-6xl md:text-8xl block">Faujdar</span>
              </h1>
            </motion.div>

            <motion.div {...fadeUp(0.35)} className="mt-5 flex items-center gap-2 font-mono text-base md:text-lg text-muted">
              <span className="text-border text-xl">{'>'}</span>
              <TypingText />
            </motion.div>

            <motion.p {...fadeUp(0.45)} className="mt-6 text-muted leading-relaxed max-w-md">
              {personalInfo.description}
            </motion.p>

            <motion.div {...fadeUp(0.55)} className="mt-8 flex flex-wrap gap-4">
              <a href="#projects"
                className="bg-accent text-bg px-7 py-3 font-display font-bold text-sm tracking-wide hover:bg-accent/90 transition-all glow">
                View Projects
              </a>
              <a href={`mailto:${personalInfo.email}`}
                className="border border-border text-text px-7 py-3 font-display font-bold text-sm tracking-wide hover:border-accent hover:text-accent transition-all">
                Hire Me →
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.65)} className="mt-8 flex items-center gap-5">
              <span className="font-mono text-xs text-border">// find me on</span>
              <div className="flex gap-4">
                {[
                  { Icon: Github,   href: personalInfo.github   },
                  { Icon: Linkedin, href: personalInfo.linkedin  },
                  { Icon: Twitter,  href: personalInfo.twitter   },
                ].map(({ Icon, href }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer"
                    className="text-muted hover:text-accent transition-colors p-1">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 hidden lg:block"
          >
            <CodeCard />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-bg p-6 text-center hover:bg-surface transition-colors">
              <div className="font-display font-extrabold text-3xl text-gradient">{stat.value}</div>
              <div className="font-mono text-xs text-muted mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
