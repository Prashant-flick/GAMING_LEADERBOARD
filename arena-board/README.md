# ArenaBoard — Frontend

A modern React + Vite frontend for the ArenaBoard leaderboard backend.

## Stack

- **React 18** with React Router v6
- **Vite** — lightning-fast dev server
- **Tailwind CSS** — utility-first styling with custom design tokens
- **Framer Motion** — page & component animations
- **Axios** — typed API client
- **Lucide React** — icons

## Design System

- Font: `Bebas Neue` (display) + `DM Sans` (body) + `JetBrains Mono` (code/numbers)
- Theme: dark base (`#08090a`) with acid-green accent (`#c8f135`)
- Animated CSS grid background, glow effects, staggered entrances

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable primitives (Button, Card, Input, Modal, …)
│   ├── AppLayout.jsx
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx   # JWT auth state
│   └── ToastContext.jsx  # Global toast notifications
├── lib/
│   ├── api.js       # Axios client + all API calls
│   └── utils.js     # cn() helper
├── pages/
│   ├── AuthPage.jsx
│   ├── Dashboard.jsx
│   ├── LeaderboardPage.jsx
│   ├── GamesPage.jsx
│   ├── PlayersPage.jsx
│   └── ScoresPage.jsx
├── App.jsx          # Router root
├── main.jsx
└── index.css        # Tailwind + global styles
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure the backend URL
cp .env.example .env
# Edit .env → VITE_API_URL=http://localhost:3000

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build
```

## APIs Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/auth/signup` | Register |
| `POST` | `/auth/signin` | Login / get JWT |
| `GET`  | `/users` | List all players |
| `GET`  | `/users/:id` | Get player by ID |
| `GET`  | `/games` | List all games |
| `GET`  | `/games/:id` | Get game by ID |
| `POST` | `/games` | Create a game |
| `POST` | `/scores` | Submit a score |
| `GET`  | `/leaderboards?gameId=&limit=` | Get ranked leaderboard |

## New APIs to Add in Backend

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET`  | `/users/:id/scores` | Player's score history |
| `GET`  | `/games/:id/scores` | All scores for a game |
| `PATCH`| `/games/:id/status` | Update game status |
| `GET`  | `/leaderboards/:id?userId=` | Player rank in a game |
