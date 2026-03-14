import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Modal({ open, onClose, title, subtitle, children, className }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative w-full max-w-md bg-surface border border-border2 rounded-2xl p-7',
              'shadow-[0_32px_80px_rgba(0,0,0,0.6)]',
              className
            )}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted hover:text-white transition-colors p-1 rounded-lg hover:bg-surface2"
            >
              <X size={16} />
            </button>

            {title && (
              <div className="mb-6">
                <h2 className="font-display text-2xl tracking-wider text-white">{title}</h2>
                {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
              </div>
            )}

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
