import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { useRevealOnScroll } from './hooks/useSmoothScroll'
import Cursor         from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar         from './components/Navbar'
import Hero           from './sections/Hero'
import About          from './sections/About'
import Skills         from './sections/Skills'
import Contributions  from './sections/Contributions'
import Projects       from './sections/Projects'
import Certifications from './sections/Certifications'
import Contact        from './sections/Contact'
import Footer         from './components/Footer'

function Inner() {
  useRevealOnScroll()
  return (
    <>
      {/* Cursor and ScrollProgress must live OUTSIDE the page-enter div.
          The page-enter animation uses transform, which makes that div a
          new containing block for position:fixed children — causing them
          to scroll with the page instead of staying fixed to the viewport. */}
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <div className="page-enter" style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
        <main>
          <Hero />
          <About />
          <Skills />
          <Contributions />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  )
}
