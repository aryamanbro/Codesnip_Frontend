/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'brand-blue': {
          light: '#00c6ff',
          DEFAULT: '#0072ff',
          dark: '#0052cc',
        },
        'brand-gray': {
          100: '#1a1a2e',
          200: '#2a2a3e',
          300: '#5a5a6e',
        }
      },
      // --- ADD THIS BLOCK ---
      ringColor: {
        'brand-blue': '#0072ff',
      }
      // --- END OF NEW BLOCK ---
    },
  },
  plugins: [],
}