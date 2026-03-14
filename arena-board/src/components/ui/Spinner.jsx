import { cn } from '@/lib/utils'

export default function Spinner({ className, size = 'md' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-8 h-8' }
  return (
    <div
      className={cn(
        'rounded-full border-2 border-border border-t-accent animate-spin',
        sizes[size],
        className
      )}
    />
  )
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Spinner size="lg" />
    </div>
  )
}
