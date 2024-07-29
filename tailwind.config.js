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
      divideDark: '#232326'
    },
    extend: {},
  },
  plugins: [],
}

