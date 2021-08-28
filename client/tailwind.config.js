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
        'background':'#1F1D1D',
        'black-one': '#3B3B3B',
        'black-two': '#222020',
        'black-three': '#2B2B2B',
        'black-four': '#3A3A3A',
        
        'main-gray': '#A6A4A4',
        'second-gray': '#E1E1E1',
        'gray-310': '#E0E0E0',
        'dark-gray': '#2D2D2D',
      },
    },
  },
}
