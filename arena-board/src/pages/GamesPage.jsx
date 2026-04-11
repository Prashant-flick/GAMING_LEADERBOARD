import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search } from 'lucide-react'
import { gamesApi } from '@/lib/api'
import { useToast } from '@/context/ToastContext'
import { StatusBadge } from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import { PageSpinner } from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import Spinner from '@/components/ui/Spinner'

const GAME_ICONS = ['🎮', '🏆', '⚡', '🎯', '🔥', '💫', '🚀', '🎲', '🌟', '🎪', '🗡️', '🛡️']

export default function GamesPage() {
  const [games, setGames]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName]   = useState('')
  const [creating, setCreating] = useState(false)
  const { toast } = useToast()

  const load = async () => {
    const { data } = await gamesApi.getAll().catch(() => ({ data: [] }))
    setGames(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleCreate = async () => {
    if (!newName.trim()) return
    setCreating(true)
    try {
      await gamesApi.create(newName.trim())
      toast('Game created!')
      setShowModal(false)
      setNewName('')
      load()
    } catch (e) {
      toast(e?.response?.data?.message || e.message, 'error')
    } finally {
      setCreating(false)
    }
  }

  const filtered = games.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 flex-wrap"
      >
        <h2 className="font-display text-2xl tracking-wider flex-1">All Games</h2>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted2" />
          <input
            className="bg-surface2 border border-border rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder:text-muted2 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 w-52"
            placeholder="Search games…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="primary" size="md" onClick={() => setShowModal(true)}>
          <Plus size={14} /> New Game
        </Button>
      </motion.div>

      {/* Content */}
      {loading ? (
        <PageSpinner />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🎮"
          title={search ? 'No games match your search' : 'No games yet'}
          description={!search ? 'Create your first arena to get started.' : undefined}
          action={!search && (
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
              <Plus size={13} /> Create Game
            </Button>
          )}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="bg-surface border border-border rounded-xl p-5 cursor-pointer hover:border-accent/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/6 border border-accent/12 flex items-center justify-center text-2xl mb-4">
                  {GAME_ICONS[i % GAME_ICONS.length]}
                </div>
                <p className="text-base font-semibold text-white mb-2">{g.name}</p>
                <StatusBadge status={g.status} />
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted2">{g.id?.slice(0, 12)}…</span>
                  <span className="font-mono text-[10px] text-muted2">
                    {new Date(g.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Create Modal */}
      <Modal
        open={showModal}
        onClose={() => { setShowModal(false); setNewName('') }}
        title="CREATE GAME"
        subtitle="Add a new arena to the leaderboard system"
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Game Name"
            placeholder="e.g. Speed Run Arena"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
          />
          <div className="flex gap-2 justify-end mt-1">
            <Button variant="ghost" onClick={() => { setShowModal(false); setNewName('') }}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate} disabled={creating || !newName.trim()}>
              {creating ? <Spinner size="sm" /> : <><Plus size={13} /> Create Game</>}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
