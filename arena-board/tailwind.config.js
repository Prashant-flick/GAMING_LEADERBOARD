/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: '#08090a',
        surface: '#111214',
        surface2: '#18191d',
        border: '#222428',
        border2: '#2e3036',
        accent: '#c8f135',
        accent2: '#a8d020',
        muted: '#8a8f9a',
        muted2: '#5a5f6a',
      },
      animation: {
        'fade-up': 'fadeUp 0.45s ease both',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 0.7s linear infinite',
        'rank-in': 'rankIn 0.3s ease both',
        'toast-in': 'toastIn 0.3s ease both',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200,241,53,0.18)' },
          '50%': { boxShadow: '0 0 24px 4px rgba(200,241,53,0.18)' },
        },
        rankIn: {
          from: { opacity: 0, transform: 'translateX(-16px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        toastIn: {
          from: { opacity: 0, transform: 'translateY(16px) scale(0.95)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
