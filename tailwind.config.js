const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
