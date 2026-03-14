import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const titles = {
  '/':            'Dashboard',
  '/leaderboard': 'Leaderboard',
  '/games':       'Games',
  '/players':     'Players',
  '/scores':      'Submit Score',
}

export default function Topbar() {
  const { pathname } = useLocation()
  const title = titles[pathname] || 'ArenaBoard'

  return (
    <header className="h-16 border-b border-border glass sticky top-0 z-40 flex items-center px-8 gap-4">
      <motion.h2
        key={pathname}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="font-display text-[22px] tracking-wider flex-1"
      >
        {title}
      </motion.h2>

      {/* Live indicator */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/6 border border-accent/12">
        <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(200,241,53,0.8)] animate-pulse" />
        <span className="text-[11px] font-mono font-semibold text-accent tracking-widest">LIVE</span>
      </div>
    </header>
  )
}
