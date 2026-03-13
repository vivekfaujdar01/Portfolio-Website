import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { personalInfo } from '../data/portfolio'
import { Github, Linkedin, Twitter, Mail, Send } from 'lucide-react'

export default function Contact() {
  const [ref, inView] = useInView(0.15)
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // For real implementation: use EmailJS, Formspree, or a backend endpoint
    // EmailJS is the easiest for students — see README for setup
    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`
    window.open(mailtoLink)
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} className="py-32 bg-bg relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-accent text-sm">04.</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl">Get In Touch</h2>
          <div className="flex-1 h-px bg-border ml-4 max-w-xs" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-muted leading-relaxed mb-8 max-w-md">
              I'm always open to interesting opportunities — internships, freelance projects,
              or just a good conversation about tech. My inbox is open.
            </p>

            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-3 text-accent font-mono text-sm hover:gap-5 transition-all duration-300 mb-10"
            >
              <Mail size={16} />
              {personalInfo.email}
              <span>→</span>
            </a>

            <div className="space-y-4 border-t border-border pt-8">
              {[
                { icon: Github,   label: 'GitHub',   href: personalInfo.github   },
                { icon: Linkedin, label: 'LinkedIn', href: personalInfo.linkedin  },
                { icon: Twitter,  label: 'Twitter',  href: personalInfo.twitter   },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-muted hover:text-accent transition-colors group"
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-sm">{label}</span>
                  <span className="ml-auto font-mono text-xs text-border group-hover:text-accent">↗</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {sent ? (
              <div className="border border-green/30 bg-green/5 p-8 text-center">
                <div className="text-green font-mono text-4xl mb-4">✓</div>
                <p className="font-display font-bold text-text text-lg mb-2">Message sent!</p>
                <p className="text-muted font-mono text-sm">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name',    label: 'Your Name',    type: 'text',  placeholder: 'John Doe' },
                  { name: 'email',   label: 'Email Address',type: 'email', placeholder: 'john@example.com' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-surface border border-border text-text font-mono text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-border"
                      style={{ cursor: 'text' }}
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hi Vivek, I'd like to talk about..."
                    required
                    rows={5}
                    className="w-full bg-surface border border-border text-text font-mono text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-border resize-none"
                    style={{ cursor: 'text' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent text-bg font-display font-bold text-sm py-3.5 tracking-wide hover:bg-accent/90 transition-all flex items-center justify-center gap-2 glow"
                >
                  <Send size={14} />
                  Send Message
                </button>
                <p className="font-mono text-xs text-border text-center">
                  // or email me directly at {personalInfo.email}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
