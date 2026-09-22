import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#FF5A1F',
          dark: '#E04B15',
          soft: '#FFE1D0',
        },
        ink: {
          DEFAULT: '#0A0A0B',
          soft: '#151517',
          line: '#26262A',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255, 90, 31, 0.15), 0 12px 40px rgba(255, 90, 31, 0.25)',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [typography],
}
