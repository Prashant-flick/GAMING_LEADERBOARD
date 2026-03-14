import { cn } from '@/lib/utils'

const statusConfig = {
  STARTED: {
    dot: 'bg-accent',
    text: 'text-accent',
    bg: 'bg-accent/8 border-accent/20',
    label: 'Started',
  },
  IN_PROGRESS: {
    dot: 'bg-blue-400',
    text: 'text-blue-400',
    bg: 'bg-blue-400/8 border-blue-400/20',
    label: 'In Progress',
  },
  FINISHED: {
    dot: 'bg-red-500',
    text: 'text-red-500',
    bg: 'bg-red-500/8 border-red-500/20',
    label: 'Finished',
  },
}

export function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.STARTED
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border',
        cfg.bg,
        cfg.text
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
      {cfg.label}
    </span>
  )
}

export function RankBadge({ rank }) {
  if (rank === 0)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-400/30 font-mono text-xs font-bold">
        🥇
      </span>
    )
  if (rank === 1)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-zinc-400/10 text-zinc-300 border border-zinc-400/30 font-mono text-xs font-bold">
        🥈
      </span>
    )
  if (rank === 2)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700/10 text-amber-600 border border-amber-600/30 font-mono text-xs font-bold">
        🥉
      </span>
    )
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface2 text-muted border border-border font-mono text-xs font-bold">
      {rank + 1}
    </span>
  )
}
