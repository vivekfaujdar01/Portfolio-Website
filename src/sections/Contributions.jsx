import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useLeetCode } from '../hooks/useLeetCode'
import { useTheme } from '../context/ThemeContext'
import { personalInfo } from '../data/portfolio'

// ─── helpers ────────────────────────────────────────────────────────────────

const GITHUB_USER   = personalInfo.githubUsername  || 'vivekfaujdar01'
const LEETCODE_USER = personalInfo.leetcodeUsername || 'vivekfaujdar'

// GitHub heatmap embed (no API key required)
const HEATMAP_URL = `https://ghchart.rshah.org/5b6ef5/${GITHUB_USER}`

// Streak card — two colour schemes for dark & light themes
const streakUrl = (dark) =>
  `https://github-readme-streak-stats.herokuapp.com?user=${GITHUB_USER}` +
  `&hide_border=true` +
  (dark
    ? `&background=0c0f1a&ring=5b6ef5&fire=06ffa5&currStreakLabel=5b6ef5&sideLabels=6b7399&dates=6b7399&stroke=1c2340&currStreakNum=e8ecf8&sideNums=e8ecf8`
    : `&background=ffffff&ring=5b6ef5&fire=5b6ef5&currStreakLabel=5b6ef5&sideLabels=5a6080&dates=5a6080&stroke=d0d5f0&currStreakNum=0c0f1a&sideNums=0c0f1a`)



// ─── Donut/Ring chart component ─────────────────────────────────────────────

function RingChart({ easy, medium, hard, total }) {
  const SIZE = 180
  const STROKE = 14
  const R = (SIZE - STROKE) / 2
  const CIRC = 2 * Math.PI * R
  const cx = SIZE / 2
  const cy = SIZE / 2

  // Segments: easy, medium, hard
  const solved = easy + medium + hard
  const gap = CIRC * 0.008

  const easyLen   = total > 0 ? (easy   / total) * CIRC - gap : 0
  const medLen    = total > 0 ? (medium / total) * CIRC - gap : 0
  const hardLen   = total > 0 ? (hard   / total) * CIRC - gap : 0

  const easyOffset   = 0
  const medOffset    = easyLen + gap
  const hardOffset   = medOffset + medLen + gap

  const segProps = (length, offset) => ({
    cx, cy, r: R,
    fill: 'none',
    strokeWidth: STROKE,
    strokeDasharray: `${length} ${CIRC - length}`,
    strokeDashoffset: -(offset),
    strokeLinecap: 'round',
    style: { transition: 'stroke-dasharray 1.4s cubic-bezier(.22,1,.36,1)' },
  })

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle cx={cx} cy={cy} r={R} fill="none" strokeWidth={STROKE} stroke="var(--border)" />
        {/* Easy — green */}
        <circle {...segProps(easyLen, easyOffset)} stroke="#1eba68" />
        {/* Medium — yellow */}
        <circle {...segProps(medLen, medOffset)} stroke="#f5a623" />
        {/* Hard — red */}
        <circle {...segProps(hardLen, hardOffset)} stroke="#f56565" />
      </svg>
      {/* Centre label */}
      <div className="absolute flex flex-col items-center">
        <span className="font-display font-bold text-3xl" style={{ color: 'var(--text)' }}>
          {solved}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          solved
        </span>
      </div>
    </div>
  )
}

// ─── LeetCode Heatmap (custom SVG — same grid as GitHub's ghchart) ──────────

function LCHeatmap({ calendar = {} }) {
  const CELL  = 11
  const GAP   = 3
  const WEEKS = 52
  const DAYS  = 7   // 0=Sun … 6=Sat

  // ── Build grid anchored to today (UTC) ──────────────────────────────────
  // LeetCode's calendar keys are Unix seconds at midnight UTC.
  // We must generate the exact same values.

  // Today at UTC midnight
  const nowUtc    = new Date()
  const todayUtc  = Date.UTC(nowUtc.getUTCFullYear(), nowUtc.getUTCMonth(), nowUtc.getUTCDate())
  const todayDay  = new Date(todayUtc).getUTCDay() // 0=Sun

  // The grid ends at the last full week containing today.
  // cell [WEEKS-1][todayDay] = today. Pad right with empty cells.
  const totalCells = WEEKS * DAYS

  const days = Array.from({ length: totalCells }, (_, i) => {
    // i=0 is top-left (oldest week, Sunday row)
    const col = Math.floor(i / DAYS)
    const row = i % DAYS
    // offset from today
    const daysAgo = (WEEKS - 1 - col) * DAYS + (todayDay - row)
    const dateUtc  = todayUtc - daysAgo * 86400 * 1000
    const tsKey    = dateUtc / 1000          // seconds, same key LeetCode uses
    const count    = calendar[tsKey] ?? calendar[String(tsKey)] ?? 0
    const isFuture = dateUtc > todayUtc
    return { dateUtc, count: isFuture ? -1 : count }
  })

  const levelColor = (count) => {
    if (count <  0) return 'transparent'     // future cells
    if (count === 0) return 'var(--border)'
    if (count === 1) return '#f5c57a'
    if (count <= 3)  return '#f5a623'
    if (count <= 6)  return '#e07c00'
    return '#b85e00'
  }

  // Month labels — place at start of each new UTC month
  const monthLabels = []
  let lastMonth = -1
  days.forEach(({ dateUtc }, i) => {
    const col = Math.floor(i / DAYS)
    const m   = new Date(dateUtc).getUTCMonth()
    if (m !== lastMonth && col < WEEKS - 1) {
      monthLabels.push({
        col,
        label: new Date(dateUtc).toLocaleString('default', { month: 'short', timeZone: 'UTC' }),
      })
      lastMonth = m
    }
  })

  const svgW = WEEKS * (CELL + GAP)
  const svgH = 22 + DAYS * (CELL + GAP)

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        style={{ display: 'block', minWidth: 560 }}
      >
        {/* Month labels */}
        {monthLabels.map(({ col, label }) => (
          <text
            key={`${col}-${label}`}
            x={col * (CELL + GAP)}
            y={13}
            fontSize={9}
            fill="var(--muted)"
            fontFamily="monospace"
          >
            {label}
          </text>
        ))}

        {/* Day cells */}
        {days.map(({ dateUtc, count }, i) => {
          const col = Math.floor(i / DAYS)
          const row = i % DAYS
          const d   = new Date(dateUtc)
          return (
            <rect
              key={i}
              x={col * (CELL + GAP)}
              y={22 + row * (CELL + GAP)}
              width={CELL}
              height={CELL}
              rx={2}
              fill={levelColor(count)}
            >
              {count >= 0 && (
                <title>{`${d.toUTCString().slice(0,16)}: ${count} submission${count !== 1 ? 's' : ''}`}</title>
              )}
            </rect>
          )
        })}
      </svg>
    </div>
  )
}


function Skeleton({ className = '', style = {} }) {
  return (
    <div
      className={`animate-pulse rounded ${className}`}
      style={{ background: 'var(--border)', ...style }}
    />
  )
}

// ─── GitHub panel ─────────────────────────────────────────────────────────

function GitHubPanel({ inView, isDark }) {
  return (
    <div className="space-y-6">
      {/* Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="p-5 overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <p className="font-mono text-xs mb-4" style={{ color: 'var(--muted)' }}>
          // contribution activity
        </p>
        <img
          src={HEATMAP_URL}
          alt="GitHub Contribution Heatmap"
          className="w-full h-auto"
          style={{ filter: 'brightness(1.1)' }}
        />
      </motion.div>

      {/* Streak card — full width, theme-aware */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="overflow-hidden flex justify-center"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <img
          key={isDark ? 'streak-dark' : 'streak-light'}
          src={streakUrl(isDark)}
          alt="GitHub Streak Stats"
          className="w-full max-w-2xl h-auto"
        />
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex justify-center"
      >
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs px-5 py-2.5 border transition-all duration-300"
          style={{ borderColor: '#5b6ef5', color: '#5b6ef5' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#5b6ef5'; e.currentTarget.style.color = 'var(--bg)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5b6ef5' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View GitHub Profile ↗
        </a>
      </motion.div>
    </div>
  )
}

// ─── LeetCode panel ──────────────────────────────────────────────────────────

function LeetCodePanel({ inView }) {
  const { data, loading, error } = useLeetCode(LEETCODE_USER)

  const statItems = data ? [
    { label: 'Total Solved', value: data.totalSolved, color: '#5b6ef5' },
    { label: 'Easy',         value: data.easySolved,   color: '#1eba68' },
    { label: 'Medium',       value: data.mediumSolved, color: '#f5a623' },
    { label: 'Hard',         value: data.hardSolved,   color: '#f56565' },
  ] : []

  const totalAttemptable = data
    ? data.totalEasy + data.totalMedium + data.totalHard
    : 0

  return (
    <div className="space-y-6">
      {/* LeetCode contribution heatmap — custom SVG grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="p-5 overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <p className="font-mono text-xs mb-4" style={{ color: 'var(--muted)' }}>
          // submission activity
        </p>
        {loading
          ? <Skeleton style={{ height: 112, width: '100%' }} />
          : <LCHeatmap calendar={data.calendar} />
        }
      </motion.div>

      {/* Stats ring card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="p-6 md:p-8"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <p className="font-mono text-xs mb-6" style={{ color: 'var(--muted)' }}>
          // problem solving stats
        </p>

        {loading ? (
          /* Skeleton */
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Skeleton style={{ width: 180, height: 180, borderRadius: '50%' }} />
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} style={{ height: 64 }} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Ring chart */}
            <RingChart
              easy={data.easySolved}
              medium={data.mediumSolved}
              hard={data.hardSolved}
              total={totalAttemptable}
            />

            {/* Stats grid */}
            <div className="flex-1 grid grid-cols-2 gap-3 w-full">
              {statItems.map(({ label, value, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="p-4"
                  style={{ background: 'var(--card)', border: `1px solid var(--border)` }}
                >
                  <div
                    className="font-display font-bold text-2xl mb-1"
                    style={{ color }}
                  >
                    {value}
                  </div>
                  <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    {label}
                  </div>
                  {/* Mini progress bar */}
                  {label !== 'Total Solved' && (
                    <div className="mt-2 h-0.5" style={{ background: 'var(--border)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? {
                          width: `${Math.round((value / (
                            label === 'Easy' ? data.totalEasy :
                            label === 'Medium' ? data.totalMedium :
                            data.totalHard
                          )) * 100)}%`
                        } : {}}
                        transition={{ duration: 1.4, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        style={{ height: '100%', background: color, boxShadow: `0 0 6px ${color}` }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-5 mt-8 pt-6"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {[
              { label: 'Easy',   color: '#1eba68' },
              { label: 'Medium', color: '#f5a623' },
              { label: 'Hard',   color: '#f56565' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: color }} />
                <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        )}

        {error && (
          <p className="font-mono text-xs text-center mt-4" style={{ color: '#f5a623' }}>
            ⚠ {error}
          </p>
        )}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex justify-center"
      >
        <a
          href={`https://leetcode.com/${LEETCODE_USER}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs px-5 py-2.5 border transition-all duration-300"
          style={{ borderColor: '#f5a623', color: '#f5a623' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f5a623'; e.currentTarget.style.color = 'var(--bg)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f5a623' }}
        >
          {/* LeetCode icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
          </svg>
          View LeetCode Profile ↗
        </a>
      </motion.div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────

const TABS = [
  { id: 'github',   label: 'GitHub',   icon: '🐙', accent: '#5b6ef5' },
  { id: 'leetcode', label: 'LeetCode', icon: '⚡', accent: '#f5a623' },
]

export default function Contributions() {
  const [ref, inView] = useInView(0.05)
  const [activeTab, setActiveTab] = useState('github')
  const { isDark } = useTheme()

  const current = TABS.find(t => t.id === activeTab)

  return (
    <section id="contributions" ref={ref} className="py-32 relative" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 dot-bg opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-sm" style={{ color: '#5b6ef5' }}>03.</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            Contributions
          </h2>
          <div className="flex-1 h-px max-w-xs ml-4" style={{ background: 'var(--border)' }} />
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-2 mb-10"
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                border: `1px solid ${activeTab === tab.id ? tab.accent : 'var(--border)'}`,
                color: activeTab === tab.id ? tab.accent : 'var(--muted)',
                background: activeTab === tab.id ? `${tab.accent}12` : 'transparent',
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: `1px solid ${current.accent}`, opacity: 0.4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === 'github'
              ? <GitHubPanel inView={inView} isDark={isDark} />
              : <LeetCodePanel inView={inView} />
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
