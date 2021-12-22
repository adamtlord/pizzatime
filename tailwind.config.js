module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Hind', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
