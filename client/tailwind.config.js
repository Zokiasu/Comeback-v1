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
    screens: {
      'ms': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1792px',
      '4xl': '2048px',
    },
    backgroundColor: theme => ({
     ...theme('colors'),
     'main-gray': '#A6A4A4',
     'second-gray': '#E1E1E1',
     'leftbar': '#3B3B3B',
     'mainbg': '#1F1D1D',
     'gray-310': '#E0E0E0',
    }),
  },

  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
}
