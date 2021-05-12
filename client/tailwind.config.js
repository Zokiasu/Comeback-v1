module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    },
    backgroundColor: theme => ({
     ...theme('colors'),
     'main-gray': '#A6A4A4',
     'second-gray': '#E1E1E1',
     'leftbar': '#3B3B3B',
     'mainbg': '#1F1D1D',
    }),
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
