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
      screens: {
        '1xl': '1400px',
        '1.5xl': '1500px',
      },

      colors: {
        'main-gray': '#A6A4A4',
        'second-gray': '#E1E1E1',
        'leftbar': '#3B3B3B',
        'search-leftbar': '#4B4B4B',
        'select-leftbar': '#5B5B5B',
        'mainbg': '#1F1D1D',
        'gray-310': '#E0E0E0',
      },
    },
  },
}
