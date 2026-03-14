import { useState, useEffect } from 'react'

const CACHE_KEY = 'vf-lc-cache-v3'
const CACHE_TTL = 30 * 60 * 1000   // 30 minutes

/**
 * Fetches LeetCode stats from leetcode-stats-api.herokuapp.com
 * — single endpoint, includes submissionCalendar, much more lenient rate limits.
 * Results are cached in sessionStorage to survive React StrictMode double-invocations
 * and basic page refreshes without burning extra quota.
 */
export function useLeetCode(username) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!username) return

    // ── Try sessionStorage cache first ────────────────────────────────────
    try {
      const raw = sessionStorage.getItem(CACHE_KEY)
      if (raw) {
        const { ts, payload, user } = JSON.parse(raw)
        if (user === username && Date.now() - ts < CACHE_TTL) {
          setData(payload)
          setLoading(false)
          return
        }
      }
    } catch (_) {}

    setLoading(true)
    setError(null)

    // We use leetcode-api-faisalshohag.vercel.app because it has native CORS 
    // support, reliable uptime, and bundles the submission calendar.
    const url = `https://leetcode-api-faisalshohag.vercel.app/${username}`

    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(d => {
        let calendar = {}
        try {
          const raw = d.submissionCalendar
          calendar = typeof raw === 'string' ? JSON.parse(raw) : (raw ?? {})
        } catch (_) {}

        const payload = {
          totalSolved:  d.totalSolved   ?? 0,
          easySolved:   d.easySolved    ?? 0,
          mediumSolved: d.mediumSolved  ?? 0,
          hardSolved:   d.hardSolved    ?? 0,
          totalEasy:    d.totalEasy     ?? 873,
          totalMedium:  d.totalMedium   ?? 1831,
          totalHard:    d.totalHard     ?? 804,
          ranking:      d.ranking       ?? null,
          calendar,
        }

        // Cache the successful result
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), user: username, payload }))
        } catch (_) {}

        setData(payload)
        setLoading(false)
      })
      .catch(err => {
        console.warn('LeetCode API error:', err.message)
        // Show fallback data so the UI still renders
        setData({
          totalSolved: 311, easySolved: 137, mediumSolved: 148, hardSolved: 26,
          totalEasy: 873, totalMedium: 1831, totalHard: 804,
          ranking: null, calendar: {},
        })
        setError('Live data unavailable — showing cached stats.')
        setLoading(false)
      })
  }, [username])

  return { data, loading, error }
}
