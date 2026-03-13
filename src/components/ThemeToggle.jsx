import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggle } = useTheme()

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92, rotate: 20 }}
      className={`relative w-10 h-10 flex items-center justify-center border border-theme rounded-full overflow-hidden
        hover:border-accent transition-colors duration-300 ${className}`}
      aria-label="Toggle theme"
      style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1 }}
            exit={{   rotate:  90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Moon size={16} className="text-accent" style={{ color: '#5b6ef5' }} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0,  opacity: 1, scale: 1 }}
            exit={{   rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Sun size={16} style={{ color: '#f59e0b' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple on click */}
      <motion.div
        key={isDark ? 'dark-ripple' : 'light-ripple'}
        initial={{ scale: 0, opacity: 0.4 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-full"
        style={{ background: isDark ? '#5b6ef5' : '#f59e0b' }}
      />
    </motion.button>
  )
}
