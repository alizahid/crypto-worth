const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false,
  theme: {
    colors,
    fontFamily: {
      body: ['IBM Plex Mono', 'monospace']
    },
    extend: {
      colors: {
        modal: 'rgba(0, 0, 0, 0.75)'
      }
    }
  },
  variants: {
    extend: {
      borderWidth: ['first']
    }
  },
  plugins: []
}
