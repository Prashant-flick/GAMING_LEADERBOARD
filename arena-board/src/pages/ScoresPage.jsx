import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Star } from 'lucide-react'
import { gamesApi, usersApi, scoresApi } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { PageSpinner } from '@/components/ui/Spinner'
import Spinner from '@/components/ui/Spinner'

export default function ScoresPage() {
  const [games, setGames]       = useState([])
  const [users, setUsers]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [gameId, setGameId]     = useState('')
  const [userId, setUserId]     = useState('')
  const [score, setScore]       = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [lastSubmit, setLastSubmit] = useState(null)

  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    Promise.all([
      gamesApi.getAll().catch(() => ({ data: [] })),
      usersApi.getAll().catch(() => ({ data: [] })),
    ]).then(([gRes, uRes]) => {
      const g = Array.isArray(gRes.data) ? gRes.data : []
      const u = Array.isArray(uRes.data) ? uRes.data : []
      setGames(g)
      setUsers(u)
      // Pre-select logged-in user
      const me = u.find((usr) => usr.email === user?.email)
      if (me) setUserId(me.id)
      setLoading(false)
    })
  }, [])

  const handleSubmit = async () => {
    if (!gameId || !userId || !score) return
    setSubmitting(true)
    try {
      await scoresApi.submit(gameId, userId, parseInt(score))
      const gameName = games.find((g) => g.id === gameId)?.name || 'Game'
      const userEmail = users.find((u) => u.id === userId)?.email || 'Player'
      setLastSubmit({ game: gameName, player: userEmail, score: parseInt(score) })
      toast('Score submitted! Leaderboard updated.')
      setScore('')
    } catch (e) {
      toast(e?.response?.data?.message || e.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <PageSpinner />

  return (
    <div className="max-w-xl flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-display text-2xl tracking-wider mb-1">Submit Score</h2>
        <p className="text-sm text-muted">Record a player score — instantly reflected in the leaderboard.</p>
      </motion.div>

      {/* Last submission flash */}
      {lastSubmit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 px-5 py-4 rounded-xl bg-accent/8 border border-accent/20"
        >
          <div className="text-2xl">✅</div>
          <div>
            <p className="text-sm font-semibold text-white">Score recorded!</p>
            <p className="text-xs text-muted mt-0.5">
              <span className="text-accent font-mono font-bold">{lastSubmit.score.toLocaleString()} pts</span>
              {' '}for <span className="text-white">{lastSubmit.player}</span> in <span className="text-white">{lastSubmit.game}</span>
            </p>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <Card>
          <div className="flex flex-col gap-5">
            <Select
              label="Game"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            >
              <option value="">— Select a game —</option>
              {games.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </Select>

            <Select
              label="Player"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value="">— Select a player —</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.email}</option>
              ))}
            </Select>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted">Score</label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 9500"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono text-2xl tracking-widest transition-all"
              />
            </div>

            {/* Info note */}
            <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-accent/4 border border-accent/10 text-xs text-muted leading-relaxed">
              <Zap size={14} className="text-accent mt-0.5 shrink-0" />
              <span>
                Scores are stored in <strong className="text-accent">Redis sorted sets</strong> for instant real-time rankings.
                Each submission updates the leaderboard immediately — no refresh needed.
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={submitting || !gameId || !userId || !score}
            >
              {submitting ? <Spinner size="sm" /> : <><Star size={15} /> Submit Score</>}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
