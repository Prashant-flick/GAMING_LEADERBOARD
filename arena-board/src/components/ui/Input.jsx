import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef(function Input({ className, label, error, ...props }, ref) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-widest text-muted">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full bg-surface2 border border-border rounded-lg px-3.5 py-2.5',
          'text-sm text-white placeholder:text-muted2 font-body',
          'outline-none transition-all duration-150',
          'focus:border-accent focus:ring-2 focus:ring-accent/10',
          error && 'border-red-500/60 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
})

export default Input

export const Select = forwardRef(function Select(
  { className, label, children, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-widest text-muted">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'w-full bg-surface2 border border-border rounded-lg px-3.5 py-2.5',
          'text-sm text-white font-body cursor-pointer',
          'outline-none transition-all duration-150',
          'focus:border-accent focus:ring-2 focus:ring-accent/10',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
})
