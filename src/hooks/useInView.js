import { useEffect, useRef, useState } from 'react'

/**
 * useInView — triggers when element enters the viewport
 * @param {number} threshold - 0 to 1, how much of the element must be visible
 * @returns [ref, inView]
 */
export function useInView(threshold = 0.1) {
  const ref     = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el) // animate once only
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
