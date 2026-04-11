import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Trophy, Gamepad2, Users, Star, LogOut,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Avatar from '@/components/ui/Avatar'

const navItems = [
  { to: '/',            label: 'Dashboard',     icon: LayoutDashboard },
  { to: '/leaderboard', label: 'Leaderboard',   icon: Trophy },
  { to: '/games',       label: 'Games',         icon: Gamepad2 },
  { to: '/players',     label: 'Players',       icon: Users },
  { to: '/scores',      label: 'Submit Score',  icon: Star },
  { to: '/load-generator', label: 'Load Generator', icon: Star}
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <aside className="w-[230px] min-h-screen bg-surface border-r border-border flex flex-col fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-border">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1
            className="font-display text-3xl tracking-[3px] text-accent leading-none"
            style={{ textShadow: '0 0 24px rgba(200,241,53,0.3)' }}
          >
            ARENA
          </h1>
          <p className="text-[10px] tracking-[3px] uppercase text-muted2 mt-1">
            Leaderboard System
          </p>
        </motion.div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted2 px-3 mb-2">
          Navigation
        </p>
        {navItems.map(({ to, label, icon: Icon }, i) => {
          const active = pathname === to
          return (
            <motion.div
              key={to}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <NavLink
                to={to}
                className={[
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 select-none',
                  active
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'text-muted hover:bg-surface2 hover:text-white border border-transparent',
                ].join(' ')}
              >
                <Icon size={15} className={active ? 'text-accent' : 'opacity-60'} />
                {label}
              </NavLink>
            </motion.div>
          )
        })}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-surface2 border border-border">
          <Avatar email={user?.email} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{user?.email}</p>
            <p className="text-[10px] text-muted2">Player</p>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="text-muted hover:text-red-400 transition-colors p-1 rounded"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
