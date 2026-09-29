/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#06070B',
          soft:    '#0A0C12',
          card:    '#0D1018',
          line:    'rgba(255,255,255,0.05)',
        },
        neon: {
          cyan:    '#6FE8FF',
          purple:  '#A68BFF',
          pink:    '#FF8FC7',
          green:   '#8FE9A8',
        },
        gold: {
          DEFAULT: '#E8D5A0',
          light:   '#F2E4BF',
          dark:    '#B8A56E',
        },
        ink: {
          DEFAULT: '#F5F5F0',
          soft:    '#C9CDD4',
          muted:   '#8B93A3',
          faint:   '#565C6B',
        },
      },
neutral: {
  950: '#0A0C10',
  900: '#0E1116',
  850: '#13161C',
  800: '#1A1E26',
  700: '#252A34',
  600: '#3A404E',
  500: '#5A6272',
  400: '#8A93A6',
  300: '#B8C0CE',
  200: '#D9DEE7',
  100: '#EEF1F5',
},
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-sm': ['2.75rem',  { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'display':    ['4.25rem',  { lineHeight: '1',    letterSpacing: '-0.04em' }],
        'display-lg': ['6.5rem',   { lineHeight: '0.95', letterSpacing: '-0.045em' }],
        'display-xl': ['9.5rem',   { lineHeight: '0.9',  letterSpacing: '-0.05em' }],
      },
      animation: {
        'float':      'float 10s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'scan':       'scan 8s linear infinite',
        'breathe':    'breathe 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.5' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        breathe: {
          '0%,100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%':     { opacity: '0.6', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};