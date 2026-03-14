import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import AppLayout from '@/components/AppLayout'
import AuthPage from '@/pages/AuthPage'
import Dashboard from '@/pages/Dashboard'
import LeaderboardPage from '@/pages/LeaderboardPage'
import GamesPage from '@/pages/GamesPage'
import PlayersPage from '@/pages/PlayersPage'
import ScoresPage from '@/pages/ScoresPage'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          {/* Public */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected shell */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index        element={<Dashboard />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="games"       element={<GamesPage />} />
            <Route path="players"     element={<PlayersPage />} />
            <Route path="scores"      element={<ScoresPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}
