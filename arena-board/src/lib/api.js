import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT on every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('arena_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auth
export const authApi = {
  signup: (email, password) => client.post('/auth/signup', { email, password }),
  signin: (email, password) => client.post('/auth/signin', { email, password }),
}

// Users
export const usersApi = {
  getAll: () => client.get('/users'),
  getById: (id) => client.get(`/users/${id}`),
}

// Games
export const gamesApi = {
  getAll: () => client.get('/games'),
  getById: (id) => client.get(`/games/${id}`),
  create: (name) => client.post('/games', { name }),
}

// Scores
export const scoresApi = {
  submit: (gameId, userId, score) =>
    client.post('/scores', { gameId, userId, score }),
}

// Leaderboard
export const leaderboardApi = {
  getTop: (gameId, limit = 10) =>
    client.get('/leaderboards', { params: { gameId, limit } }),
  getRank: (gameId, userId) =>
    client.get(`/leaderboards/${gameId}`, { params: { userId } }),
}

// 🔥 Request Interceptor → attach token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("arena_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 RESPONSE INTERCEPTOR (auto logout on 401)
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('arena_token');
      localStorage.removeItem('arena_user');
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default client
