const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['pages/**/*.js', 'components/**/*.js'],
  mode: 'jit',
  darkMode: false,
  theme: {
    colors,
    fontFamily: {
      body: ['Roboto Mono', 'monospace']
    },
    extend: {}
  },
  variants: {},
  plugins: []
}
