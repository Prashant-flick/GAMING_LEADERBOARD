import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { gamesApi, usersApi, leaderboardApi } from '@/lib/api'
import { useToast } from '@/context/ToastContext'
import { Card, CardHeader, CardTitle, CardSubtitle } from '@/components/ui/Card'
import { Select } from '@/components/ui/Input'
import { RankBadge } from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import Avatar from '@/components/ui/Avatar'

// ── Podium ──────────────────────────────────────────────────────────────────
function Podium({ top3, getEmail }) {
  // Visual order: 2nd | 1st | 3rd
  const order = [top3[1], top3[0], top3[2]].filter(Boolean)
  const medals = ['🥈', '👑', '🥉']
  const heights = ['h-16', 'h-24', 'h-12']
  const glows = [
    'border-zinc-400/30 bg-gradient-to-t from-zinc-400/15 to-zinc-400/3',
    'border-yellow-400/40 bg-gradient-to-t from-yellow-400/20 to-yellow-400/4',
    'border-amber-600/30 bg-gradient-to-t from-amber-600/15 to-amber-600/3',
  ]
  const ringColors = ['border-zinc-400/40', 'border-yellow-400/50', 'border-amber-600/40']
  const avatarGlows = [
    '',
    'shadow-[0_0_16px_rgba(255,215,0,0.35)]',
    '',
  ]

  return (
    <div className="flex items-end justify-center gap-3 py-4">
      {order.map((entry, i) => {
        if (!entry) return null
        const email = getEmail(entry.userId)
        const isFirst = medals[i] === '👑'
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-black bg-gradient-to-br from-accent to-green-400 border-2 ${ringColors[i]} ${avatarGlows[i]}`}
              >
                {email[0]?.toUpperCase()}
              </div>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-base">{medals[i]}</span>
            </div>
            <p className="text-xs text-muted max-w-[72px] text-center truncate">{email}</p>
            <p className="font-mono text-[11px] text-accent font-semibold">{entry.score.toLocaleString()} pts</p>
            <div className={`w-20 rounded-t-lg border flex items-center justify-center font-display text-2xl text-white/30 ${heights[i]} ${glows[i]}`}>
              {medals[i] === '👑' ? 1 : medals[i] === '🥈' ? 2 : 3}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function LeaderboardPage() {
  const [games, setGames]           = useState([])
  const [users, setUsers]           = useState([])
  const [selectedGame, setSelectedGame] = useState('')
  const [limit, setLimit]           = useState(10)
  const [entries, setEntries]       = useState([])
  const [loadingInit, setLoadingInit] = useState(true)
  const [loadingBoard, setLoadingBoard] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    Promise.all([
      gamesApi.getAll().catch(() => ({ data: [] })),
      usersApi.getAll().catch(() => ({ data: [] })),
    ]).then(([gRes, uRes]) => {
      setGames(Array.isArray(gRes.data) ? gRes.data : [])
      setUsers(Array.isArray(uRes.data) ? uRes.data : [])
      setLoadingInit(false)
    })
  }, [])

  const fetchBoard = useCallback(async (gameId, lim) => {
    if (!gameId) return
    setLoadingBoard(true)
    try {
      const { data } = await leaderboardApi.getTop(gameId, lim)
      // Redis returns flat array: [userId, score, userId, score, …]
      const parsed = []
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i += 2) {
          parsed.push({ userId: data[i], score: parseInt(data[i + 1]) })
        }
      }
      setEntries(parsed)
    } catch (e) {
      toast(e?.response?.data?.message || e.message, 'error')
    } finally {
      setLoadingBoard(false)
    }
  }, [toast])

  useEffect(() => {
    fetchBoard(selectedGame, limit)
  }, [selectedGame, limit, fetchBoard])

  const getEmail = (userId) => {
    const u = users.find((u) => u.id === userId)
    return u ? u.email : `${userId?.slice(0, 8)}…`
  }

  const top3 = entries.slice(0, 3)
  const rest  = entries.slice(3)

  if (loadingInit) return <PageSpinner />

  return (
    <div className="flex flex-col gap-5">
      {/* Controls card */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <Select
              label="Select Game"
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
            >
              <option value="">— Choose a game —</option>
              {games.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </Select>
          </div>
          <div className="w-36">
            <Select
              label="Show Top"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              {[5, 10, 20, 50].map((v) => (
                <option key={v} value={v}>Top {v}</option>
              ))}
            </Select>
          </div>
          <Button
            variant="ghost"
            size="md"
            onClick={() => fetchBoard(selectedGame, limit)}
            disabled={!selectedGame || loadingBoard}
          >
            <RefreshCw size={14} className={loadingBoard ? 'animate-spin' : ''} />
            Refresh
          </Button>
        </Card>
      </motion.div>

      {/* Empty prompt */}
      {!selectedGame && (
        <EmptyState icon="🏆" title="Select a game to see the leaderboard" />
      )}

      {/* Loading board */}
      {selectedGame && loadingBoard && <PageSpinner />}

      {/* No scores yet */}
      {selectedGame && !loadingBoard && entries.length === 0 && (
        <EmptyState
          icon="📊"
          title="No scores recorded yet"
          description="Submit a score to this game to see rankings here."
        />
      )}

      {/* Podium + table */}
      {selectedGame && !loadingBoard && entries.length > 0 && (
        <AnimatePresence>
          {/* Podium */}
          {top3.length > 0 && (
            <motion.div
              key="podium"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>🏆 Top Performers</CardTitle>
                    <CardSubtitle>{games.find((g) => g.id === selectedGame)?.name}</CardSubtitle>
                  </div>
                </CardHeader>
                <Podium top3={top3} getEmail={getEmail} />
              </Card>
            </motion.div>
          )}

          {/* Full table */}
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Full Rankings</h3>
                <span className="font-mono text-[11px] text-muted2">{entries.length} players</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 px-6 py-3 w-20">Rank</th>
                      <th className="text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 px-6 py-3">Player</th>
                      <th className="text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 px-6 py-3">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.04 }}
                        className={[
                          'border-b border-border/50 transition-colors',
                          i < 3 ? 'hover:bg-accent/[0.03]' : 'hover:bg-white/[0.015]',
                        ].join(' ')}
                      >
                        <td className="px-6 py-3.5">
                          <RankBadge rank={i} />
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <Avatar email={getEmail(entry.userId)} size="sm" />
                            <span className={`text-sm font-medium ${i < 3 ? 'text-white' : 'text-muted'}`}>
                              {getEmail(entry.userId)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <span className="score-pill">⚡ {entry.score.toLocaleString()}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
