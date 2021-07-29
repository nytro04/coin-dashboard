const colors = require('tailwindcss/colors')
module.exports = {
  purge: {
    mode: 'layers',
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      // TypeScript
      'plugins/**/*.ts',
      'nuxt.config.ts'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        primary: '#6800f2',
        'sec-dark': '#1b1720',
        'sec-darker': '#121016',
        'icon-color': '#3d64fa'
      }
    }
  },
  variants: {
    extend: {}
  }
}
