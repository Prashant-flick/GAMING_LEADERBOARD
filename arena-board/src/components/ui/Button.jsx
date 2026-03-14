import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bg-accent text-black border-accent hover:bg-accent2 hover:border-accent2 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(200,241,53,0.35)] active:translate-y-0',
  ghost:
    'bg-transparent text-muted border-border hover:bg-surface2 hover:text-white hover:border-border2',
  danger:
    'bg-transparent text-red-500 border-red-500/30 hover:bg-red-500/10',
  outline:
    'bg-transparent text-white border-border2 hover:bg-surface2',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-3 text-base gap-2.5',
  icon: 'p-2',
}

const Button = forwardRef(function Button(
  { className, variant = 'ghost', size = 'md', disabled, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-lg border font-body font-semibold',
        'transition-all duration-150 cursor-pointer select-none whitespace-nowrap',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
