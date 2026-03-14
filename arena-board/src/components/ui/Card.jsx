import { cn } from '@/lib/utils'

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-xl p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('flex items-start justify-between mb-5', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('text-sm font-semibold tracking-wide text-white', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardSubtitle({ className, children, ...props }) {
  return (
    <p className={cn('text-xs text-muted2 mt-0.5', className)} {...props}>
      {children}
    </p>
  )
}
