import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'

export default function AuthPage() {
  const [tab, setTab] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login, signup } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!email || !password) return
    setError('')
    setLoading(true)
    try {
      if (tab === 'signup') {
        await signup(email, password)
        toast('Account created! Please sign in.')
        setTab('signin')
        setPassword('')
      } else {
        await login(email, password)
        toast('Welcome back!')
      }
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Something went wrong'
      setError(Array.isArray(msg) ? msg.join(', ') : msg)
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit() }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg">
      {/* Radial glow */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,241,53,0.07) 0%, transparent 65%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/30"
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
          style={{
            left: `${15 + i * 14}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[400px] mx-4"
      >
        <div
          className="bg-surface border border-border2 rounded-2xl p-10"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,241,53,0.04)' }}
        >
          {/* Logo */}
          <div className="mb-8">
            <h1
              className="font-display text-5xl tracking-[5px] text-accent leading-none"
              style={{ textShadow: '0 0 36px rgba(200,241,53,0.4)' }}
            >
              ARENA
            </h1>
            <p className="text-[11px] tracking-[3px] uppercase text-muted2 mt-2">
              Leaderboard System
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-surface2 rounded-lg p-1 mb-7">
            {['signin', 'signup'].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError('') }}
                className={[
                  'flex-1 py-2 text-[13px] font-semibold rounded-md transition-all duration-150 font-body',
                  tab === t
                    ? 'bg-accent text-black shadow-sm'
                    : 'text-muted hover:text-white',
                ].join(' ')}
              >
                {t === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 px-4 py-2.5 rounded-lg bg-red-500/8 border border-red-500/20 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
              autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
            />

            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              className="w-full mt-1 animate-pulse-glow"
            >
              {loading ? <Spinner size="sm" /> : (tab === 'signin' ? 'Sign In' : 'Create Account')}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
