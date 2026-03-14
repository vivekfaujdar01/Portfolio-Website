import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { personalInfo } from '../data/portfolio'
import { Github, Linkedin, Twitter, Mail, Send, ArrowRight } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [ref, inView] = useInView(0.12)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
  e.preventDefault()
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    { name: form.name, email: form.email, message: form.message },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  ).then(() => setSent(true))
}

  return (
    <section id="contact" ref={ref} className="py-32 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Big ambient glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(91,110,245,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-sm" style={{ color: '#5b6ef5' }}>04.</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            Get In Touch
          </h2>
          <div className="flex-1 h-px max-w-xs ml-4" style={{ background: 'var(--border)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22,1,0.36,1] }}
          >
            {/* Big email */}
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ x: 8 }}
              className="flex items-center gap-3 font-mono text-sm mb-10 group"
              style={{ color: '#5b6ef5' }}
            >
              <Mail size={16} />
              {personalInfo.email}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <p className="leading-relaxed mb-10 max-w-md" style={{ color: 'var(--muted)' }}>
              I'm always open to interesting opportunities — internships, freelance projects, or just a good
              conversation about tech. My inbox is always open.
            </p>

            {/* Social links */}
            <div className="space-y-4" style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              {[
                { Icon: Github,   label: 'GitHub',   sub: 'vivekfaujdar', href: personalInfo.github   },
                { Icon: Linkedin, label: 'LinkedIn',  sub: 'in/vivekfaujdar', href: personalInfo.linkedin  },
                { Icon: Twitter,  label: 'Twitter',   sub: '@vivekfaujdar', href: personalInfo.twitter   },
              ].map(({ Icon, label, sub, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 p-3 transition-all group"
                  style={{ border: '1px solid transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--card)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent' }}
                >
                  <Icon size={18} style={{ color: '#5b6ef5' }} />
                  <div>
                    <div className="font-display font-medium text-sm" style={{ color: 'var(--text)' }}>{label}</div>
                    <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{sub}</div>
                  </div>
                  <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#5b6ef5' }} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22,1,0.36,1] }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 text-center"
                style={{ border: '1px solid #06ffa5', background: 'rgba(6,255,165,0.05)' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-5xl mb-4"
                >✓</motion.div>
                <p className="font-display font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>Message Sent!</p>
                <p className="font-mono text-sm" style={{ color: 'var(--muted)' }}>I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name',  label: 'Your Name',     type: 'text',  ph: 'John Doe' },
                  { name: 'email', label: 'Email Address',  type: 'email', ph: 'john@example.com' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="font-mono text-xs uppercase tracking-widest block mb-2"
                      style={{ color: focused === field.name ? '#5b6ef5' : 'var(--muted)' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type} name={field.name} value={form[field.name]}
                      onChange={handleChange} placeholder={field.ph} required
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                      className="w-full font-mono text-sm px-4 py-3 outline-none transition-all"
                      style={{
                        background: 'var(--surface)', cursor: 'text',
                        color: 'var(--text)',
                        border: `1px solid ${focused === field.name ? '#5b6ef5' : 'var(--border)'}`,
                        boxShadow: focused === field.name ? '0 0 0 3px rgba(91,110,245,0.1)' : 'none',
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label className="font-mono text-xs uppercase tracking-widest block mb-2"
                    style={{ color: focused === 'message' ? '#5b6ef5' : 'var(--muted)' }}>
                    Message
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Hi Vivek, I'd like to talk about..." required rows={5}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className="w-full font-mono text-sm px-4 py-3 outline-none resize-none transition-all"
                    style={{
                      background: 'var(--surface)', cursor: 'text',
                      color: 'var(--text)',
                      border: `1px solid ${focused === 'message' ? '#5b6ef5' : 'var(--border)'}`,
                      boxShadow: focused === 'message' ? '0 0 0 3px rgba(91,110,245,0.1)' : 'none',
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 font-display font-semibold text-sm tracking-wide flex items-center justify-center gap-2 accent-glow"
                  style={{ background: '#5b6ef5', color: 'var(--bg)' }}
                >
                  <Send size={14} /> Send Message
                </motion.button>

                <p className="font-mono text-xs text-center" style={{ color: 'var(--muted)' }}>
                  // or email me at {personalInfo.email}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
