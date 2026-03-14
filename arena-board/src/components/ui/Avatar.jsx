import { cn } from '@/lib/utils'

const sizes = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
  xl: 'w-12 h-12 text-lg',
}

export default function Avatar({ email = '', size = 'md', className }) {
  const letter = email?.[0]?.toUpperCase() || '?'
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold text-black shrink-0',
        'bg-gradient-to-br from-accent to-green-400',
        sizes[size],
        className
      )}
    >
      {letter}
    </div>
  )
}
