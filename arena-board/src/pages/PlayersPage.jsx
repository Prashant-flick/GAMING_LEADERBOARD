import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { usersApi } from '@/lib/api'
import { Card } from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'

export default function PlayersPage() {
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')

  useEffect(() => {
    usersApi.getAll()
      .then(({ data }) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 flex-wrap"
      >
        <h2 className="font-display text-2xl tracking-wider flex-1">All Players</h2>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted2" />
          <input
            className="bg-surface2 border border-border rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder:text-muted2 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 w-56"
            placeholder="Search players…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      {loading ? (
        <PageSpinner />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="p-0 overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  icon="👥"
                  title={search ? 'No players match your search' : 'No players registered'}
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 px-6 py-4">#</th>
                      <th className="text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 px-6 py-4">Player</th>
                      <th className="text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 px-6 py-4">User ID</th>
                      <th className="text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-muted2 px-6 py-4">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u, i) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.03 }}
                        className="border-b border-border/50 hover:bg-white/[0.018] transition-colors"
                      >
                        <td className="px-6 py-3.5 font-mono text-xs text-muted2">{i + 1}</td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <Avatar email={u.email} size="sm" />
                            <span className="text-sm font-medium text-white">{u.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="font-mono text-[11px] text-muted2">{u.id?.slice(0, 18)}…</span>
                        </td>
                        <td className="px-6 py-3.5 text-right font-mono text-[11px] text-muted2">
                          {new Date(u.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  )
}
