/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', '"Cabinet Grotesk"', 'sans-serif'],
        body:    ['"Satoshi"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Dark theme
        'dark-bg':      '#060810',
        'dark-surface': '#0c0f1a',
        'dark-card':    '#111526',
        'dark-border':  '#1c2340',
        'dark-text':    '#e8ecf8',
        'dark-muted':   '#6b7399',
        // Light theme
        'light-bg':      '#f4f6ff',
        'light-surface': '#ffffff',
        'light-card':    '#eef0ff',
        'light-border':  '#d0d5f0',
        'light-text':    '#0c0f1a',
        'light-muted':   '#5a6080',
        // Accents (shared)
        accent:  '#5b6ef5',
        accent2: '#8b5cf6',
        neon:    '#06ffa5',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite reverse',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scan':       'scan 4s linear infinite',
        'slide-up':   'slideUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.4' },
          '50%':     { opacity: '0.8' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(60px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

