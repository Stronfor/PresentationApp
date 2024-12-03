/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,ts,vue}"],
  theme: {
    colors: {
      darkApp: 'var(--dark-app)',
      darkBg: 'var(--dark-bg)',
      lightApp: 'var(--light-app)',
      lightBg: 'var(--light-bg)',
      textLight: 'var(--text-light)',
      textDark: 'var(--text-dark)',
      borderDark: '#2b2b2e',
      borderLight: '#f0f0f0',
      hoverText: '#1fbbaa',
      divideLight: '#e0e0ec',
      divideDark: '#232326',

      black: 'black',

      zinc50: '#fafafa',
      zinc100: '#f4f4f5',
      zinc200: '#e4e4e7',
      zinc300: '#d4d4d8',
      zinc400: '#a1a1aa',
      zinc500: '#71717a',
      zinc600: '#52525b',
      zinc700: '#3f3f46',
      zinc800: '#27272a',
      zinc900: '#18181b',

      teal500: '#14b8a6'
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      animation: {
       
      },
      keyframes: {
       
      }
    },
  },
  plugins: [],
}

