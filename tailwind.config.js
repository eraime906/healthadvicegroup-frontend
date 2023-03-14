/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'tile': ['monospace'],
      },
      backgroundImage: {
        'footer': "url('./assets/footer-background.png')",
      }
    }
  },
  plugins: [],
}