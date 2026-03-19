import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { personalInfo, stats } from '../data/portfolio'
import { Github, Linkedin, Twitter, ArrowDown, Sparkles } from 'lucide-react'

const ROLES = [
  "Full Stack Developer",
  "React Enthusiast",
  "Backend Engineer",
  "DSA Enthusiast",
  "Problem Solver",
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
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = charIdx + 1
        setDisplayed(current.slice(0, next))
        if (next === current.length) {
          setPaused(true)
          setTimeout(() => { setDeleting(true); setPaused(false) }, 2000)
        } else setCharIdx(next)
      } else {
        const next = charIdx - 1
        setDisplayed(current.slice(0, next))
        if (next === 0) {
          setDeleting(false)
          setCharIdx(0)
          setRoleIdx(r => (r + 1) % ROLES.length)
        } else setCharIdx(next)
      }
    }, deleting ? 32 : 68)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, roleIdx, paused])

  return (
    <span>
      <span style={{ color: 'var(--text)' }}>{displayed}</span>
      <span className="cursor-blink" style={{ color: '#5b6ef5' }}>|</span>
    </span>
  )
}

function FloatingOrb({ size, delay, x, y, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y,
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        filter: 'blur(40px)'
      }}
      animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

function CodeCard() {
  const [activeIdx, setActiveIdx] = useState(-1)

  const lines = [
    { code: <><span style={{color:'var(--code-keyword)'}}>const</span> <span style={{color:'var(--code-var)'}}>vivek</span> <span style={{color:'var(--muted)'}}>=</span> {'{'}</>, blank: false },
    { code: <><span className="pl-4 block"><span style={{color:'var(--code-prop)'}}>name</span><span style={{color:'var(--muted)'}}>:</span> <span style={{color:'var(--code-string)'}}>"Vivek Faujdar"</span>,</span></>, blank: false },
    { code: <><span className="pl-4 block"><span style={{color:'var(--code-prop)'}}>role</span><span style={{color:'var(--muted)'}}>:</span> <span style={{color:'var(--code-string)'}}>"Full Stack Dev"</span>,</span></>, blank: false },
    { code: <><span className="pl-4 block"><span style={{color:'var(--code-prop)'}}>stack</span><span style={{color:'var(--muted)'}}>:</span> [<span style={{color:'var(--code-string)'}}>"React"</span>, <span style={{color:'var(--code-string)'}}>"Node"</span>, <span style={{color:'var(--code-string)'}}>"Java"</span>],</span></>, blank: false },
    { code: <><span className="pl-4 block"><span style={{color:'var(--code-prop)'}}>available</span><span style={{color:'var(--muted)'}}>:</span> <span style={{color:'var(--code-bool)'}}>true</span></span></>, blank: false },
    { code: <>{'}'}</>, blank: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="accent-glow"
      style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <span className="w-3 h-3 rounded-full bg-red-500/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span className="w-3 h-3 rounded-full" style={{ background: '#06ffa5', opacity: 0.7 }} />
        <span className="font-mono text-xs ml-2" style={{ color: 'var(--muted)' }}>vivek.config.js</span>
        <motion.span
          className="ml-auto w-2 h-2 rounded-full"
          style={{ background: '#06ffa5' }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>

      {/* Code */}
      <div className="p-6 font-mono text-sm leading-7">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="flex gap-4 group cursor-default"
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(-1)}
            style={{
              background: activeIdx === i ? 'rgba(91,110,245,0.06)' : 'transparent',
              marginLeft: -8,
              paddingLeft: 8,
              borderLeft: activeIdx === i ? '2px solid #5b6ef5' : '2px solid transparent',
            }}
          >
            <span className="select-none w-4 text-right" style={{ color: 'var(--border)' }}>{i + 1}</span>
            <span>{line.code}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-2 font-mono text-sm"
        >
          <span style={{ color: 'var(--code-keyword)' }}>export default</span>
          <span style={{ color: 'var(--text)' }}> vivek</span>
          <span className="cursor-blink" style={{ color: '#5b6ef5' }}>_</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } },
  item: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  }
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 grid-bg">
      <FloatingOrb size={600} delay={0}   x="−10%"  y="5%"   color="#5b6ef5" />
      <FloatingOrb size={400} delay={2}   x="60%"  y="50%"  color="#8b5cf6" />
      <FloatingOrb size={300} delay={4}   x="20%"  y="70%"  color="#06ffa5" />

      <div className="max-w-6xl mx-auto px-6 w-full py-24">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Text */}
          <motion.div
            className="lg:col-span-3"
            variants={stagger.container}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={stagger.item}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 font-mono text-xs"
              style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
            >
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: '#06ffa5' }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span style={{ color: 'var(--muted)' }}>Open to internships &amp; projects — 2026</span>
            </motion.div>

            {/* Name */}
            <motion.div variants={stagger.item}>
              <p className="font-mono text-sm tracking-widest mb-3" style={{ color: '#5b6ef5' }}>
                {'> Hello, world! I\'m'}
              </p>
              <h1 className="font-display font-bold leading-none tracking-tight">
                <motion.span
                  className="block"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', color: 'var(--text)' }}
                >
                  Vivek
                </motion.span>
                <motion.span
                  className="block text-gradient"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)' }}
                >
                  Faujdar
                </motion.span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div variants={stagger.item}
              className="mt-5 flex items-center gap-2 font-mono text-lg"
              style={{ color: 'var(--muted)' }}
            >
              <span style={{ color: 'var(--border)', fontSize: '1.25rem' }}>{'>'}</span>
              <TypingText />
            </motion.div>

            {/* Desc */}
            <motion.p variants={stagger.item}
              className="mt-5 leading-relaxed max-w-md"
              style={{ color: 'var(--muted)', fontSize: '0.95rem' }}
            >
              {personalInfo.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={stagger.item} className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 font-display font-semibold text-sm tracking-wide accent-glow"
                style={{ background: '#5b6ef5', color: 'var(--bg)' }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 font-display font-semibold text-sm tracking-wide transition-all"
                style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#5b6ef5'; e.currentTarget.style.color = '#5b6ef5' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
              >
                Hire Me →
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={stagger.item} className="mt-8 flex items-center gap-5">
              <span className="font-mono text-xs" style={{ color: 'var(--border)' }}>// connect</span>
              <div className="flex gap-4">
                {[
                  { Icon: Github,   href: personalInfo.github   },
                  { Icon: Linkedin, href: personalInfo.linkedin  },
                  { Icon: Twitter,  href: personalInfo.twitter   },
                ].map(({ Icon, href }) => (
                  <motion.a key={href} href={href} target="_blank" rel="noreferrer"
                    whileHover={{ y: -3, scale: 1.2 }}
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#5b6ef5'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Code card */}
          <div className="lg:col-span-2 hidden lg:block">
            <CodeCard />
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4"
          style={{ border: '1px solid var(--border)' }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ background: 'var(--card)' }}
              className="p-6 text-center transition-colors"
              style={{ borderRight: i < 3 ? '1px solid var(--border)' : 'none', background: 'var(--surface)' }}
            >
              <div className="font-display font-bold text-3xl text-gradient counter">{stat.value}</div>
              <div className="font-mono text-xs mt-1 uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{ color: 'var(--muted)' }}
        aria-label="Scroll"
        onMouseEnter={e => e.currentTarget.style.color = '#5b6ef5'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
      >
        <span className="font-mono text-xs tracking-widest uppercase">scroll</span>
        <ArrowDown size={16} />
      </motion.a>
    </section>
  )
}
