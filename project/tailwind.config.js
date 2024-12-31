/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff1a75',
          50: '#fff1f6',
          100: '#ffe4ed',
          200: '#ffc9dc',
          300: '#ff9dbe',
          400: '#ff619b',
          500: '#ff1a75',
          600: '#eb0058',
          700: '#c90048',
          800: '#a80040',
          900: '#8c003b',
          950: '#4c001b',
        },
        dark: {
          DEFAULT: '#0f0f0f',
          background: '#0f172a',
          card: '#1e293b',
          'card-hover': '#334155',
          border: '#334155',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#ff1a75',
              '&:hover': {
                color: '#eb0058',
              },
            },
            h1: {
              color: 'inherit',
            },
            h2: {
              color: 'inherit',
            },
            h3: {
              color: 'inherit',
            },
            h4: {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};