import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Cursor() {
  const [pos, setPos]           = useState({ x: -100, y: -100 })
  const [hover, setHover]       = useState(false)
  const [clicking, setClicking] = useState(false)
  const [trail, setTrail]       = useState([])
  const trailId                 = useRef(0)
  const { isDark }              = useTheme()

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setTrail(t => [...t.slice(-8), { x: e.clientX, y: e.clientY, id: ++trailId.current }])
    }
    const down = () => setClicking(true)
    const up   = () => setClicking(false)

    // Use event delegation on document so ALL elements — including those
    // rendered later by Framer Motion or scroll reveals — are covered.
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHover(true)
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHover(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  const accentColor = '#5b6ef5'

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="fixed rounded-full pointer-events-none z-[9990]"
          style={{
            left: point.x - 2,
            top:  point.y - 2,
            width: 4,
            height: 4,
            background: accentColor,
            opacity: (i + 1) / trail.length * 0.3,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          scale: clicking ? 0.6 : hover ? 0 : 1,
          background: accentColor,
        }}
        transition={{ type: 'spring', stiffness: 900, damping: 40, mass: 0.3 }}
        style={{ width: 10, height: 10 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
        animate={{
          x: pos.x - (hover ? 28 : 18),
          y: pos.y - (hover ? 28 : 18),
          width:  hover ? 56 : 36,
          height: hover ? 56 : 36,
          borderColor: hover ? '#06ffa5' : accentColor,
          opacity: clicking ? 0.3 : hover ? 0.7 : 0.4,
          scale: clicking ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        style={{ border: '1.5px solid', mixBlendMode: 'normal' }}
      />
    </>
  )
}
