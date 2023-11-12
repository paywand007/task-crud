/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        small: { min: '360px', max: '650px' },
        medium: { min: '651px', max: '1023px' },
        large: { min: '1024px', max: '1279px' },
    },
  },
  plugins: [],
}}