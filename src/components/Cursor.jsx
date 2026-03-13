import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos]       = useState({ x: 0, y: 0 })
  const [hover, setHover]   = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }
    const onEnter = () => setHover(true)
    const onLeave = () => setHover(false)

    window.addEventListener('mousemove', move)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [visible])

  if (!visible) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-accent"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: hover ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 800, damping: 40 }}
        style={{ width: 8, height: 8 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-accent"
        animate={{
          x: pos.x - (hover ? 24 : 16),
          y: pos.y - (hover ? 24 : 16),
          width:  hover ? 48 : 32,
          height: hover ? 48 : 32,
          opacity: hover ? 0.6 : 0.35,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  )
}
