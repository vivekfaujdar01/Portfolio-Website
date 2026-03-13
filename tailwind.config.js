/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg:      '#080c10',
        surface: '#0d1117',
        card:    '#111820',
        border:  '#1e2d3d',
        accent:  '#00d4ff',
        accent2: '#0099cc',
        green:   '#39d353',
        text:    '#e6edf3',
        muted:   '#7d8590',
      },
    },
  },
  plugins: [],
}
