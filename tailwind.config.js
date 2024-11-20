/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE5251',
        secondary: '#D87876',
        accent: '#FFD4D4',
        background: '#FAFAFA',
      }
    },
  },
  plugins: [],
}
