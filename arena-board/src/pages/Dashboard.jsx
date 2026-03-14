import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gamesApi, usersApi } from '@/lib/api'
import StatCard from '@/components/ui/StatCard'
import { Card, CardHeader, CardTitle, CardSubtitle } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'

const GAME_ICONS = ['🎮', '🏆', '⚡', '🎯', '🔥', '💫', '🚀', '🎲', '🌟', '🎪']

export default function Dashboard() {
  const [games, setGames] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      gamesApi.getAll().catch(() => ({ data: [] })),
      usersApi.getAll().catch(() => ({ data: [] })),
    ]).then(([gRes, uRes]) => {
      setGames(Array.isArray(gRes.data) ? gRes.data : [])
      setUsers(Array.isArray(uRes.data) ? uRes.data : [])
      setLoading(false)
    })
  }, [])

  if (loading) return <PageSpinner />

  const started    = games.filter((g) => g.status === 'STARTED').length
  const inProgress = games.filter((g) => g.status === 'IN_PROGRESS').length
  const finished   = games.filter((g) => g.status === 'FINISHED').length

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Games"  value={games.length} delta="All arenas"         icon="🎮" delay={0}    />
        <StatCard label="Total Players" value={users.length} delta="Registered users"   icon="👥" delay={0.06} />
        <StatCard label="Live Now"      value={inProgress}   delta="In-progress games"  icon="🟢" delay={0.12} />
        <StatCard label="Finished"      value={finished}     delta="Completed arenas"   icon="🏁" delay={0.18} />
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Recent Games</CardTitle>
                <CardSubtitle>Latest arenas created</CardSubtitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/games')}>
                View All
              </Button>
            </CardHeader>

            {games.length === 0 ? (
              <EmptyState icon="🎮" title="No games yet" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 pb-3">Game</th>
                      <th className="text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 pb-3">Status</th>
                      <th className="text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 pb-3">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games.slice(0, 5).map((g, i) => (
                      <tr key={g.id} className="border-b border-border/50 hover:bg-white/[0.015] transition-colors">
                        <td className="py-3 text-sm font-medium text-white">
                          {GAME_ICONS[i % GAME_ICONS.length]} {g.name}
                        </td>
                        <td className="py-3"><StatusBadge status={g.status} /></td>
                        <td className="py-3 text-right font-mono text-[11px] text-muted2">
                          {new Date(g.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Recent Players */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26 }}
        >
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Recent Players</CardTitle>
                <CardSubtitle>Latest registrations</CardSubtitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/players')}>
                View All
              </Button>
            </CardHeader>

            {users.length === 0 ? (
              <EmptyState icon="👥" title="No players yet" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 pb-3">Player</th>
                      <th className="text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 pb-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 5).map((u) => (
                      <tr key={u.id} className="border-b border-border/50 hover:bg-white/[0.015] transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar email={u.email} size="sm" />
                            <span className="text-sm font-medium text-white">{u.email}</span>
                          </div>
                        </td>
                        <td className="py-3 text-right font-mono text-[11px] text-muted2">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
