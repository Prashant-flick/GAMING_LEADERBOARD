import { createContext, useContext, useState, useCallback } from 'react'
import { authApi } from '@/lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('arena_token'))
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('arena_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const login = useCallback(async (email, password) => {
    const { data } = await authApi.signin(email, password)
    setToken(data.access_token)
    setUser(data.user)
    localStorage.setItem('arena_token', data.access_token)
    localStorage.setItem('arena_user', JSON.stringify(data.user))
    return data
  }, [])

  const signup = useCallback(async (email, password) => {
    const { data } = await authApi.signup(email, password)
    return data
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('arena_token')
    localStorage.removeItem('arena_user')
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
