import { motion } from 'framer-motion'

export default function StatCard({ label, value, delta, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="relative bg-surface border border-border rounded-xl p-5 overflow-hidden"
    >
      {/* top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted2">{label}</p>
          <p className="font-display text-5xl tracking-wide text-white mt-2 leading-none">{value ?? '—'}</p>
          {delta && <p className="text-xs text-accent mt-1.5">{delta}</p>}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-accent/6 border border-accent/10 flex items-center justify-center text-xl shrink-0">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  )
}
