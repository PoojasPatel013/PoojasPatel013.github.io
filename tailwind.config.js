/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          800: '#e9d5ff',    // Brand text - soft lavender on dark
          500: '#c084fc',    // Brand Muted - purple
          400: '#d8b4fe',    // Brand Light text
          300: '#f0abfc',    // Brand Faint
        },
        offwhite: '#0d0118', // Deep neon purple-black background
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
