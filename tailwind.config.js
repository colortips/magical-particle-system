/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    colors:{
      'transparent': 'transparent',
      'current': 'currentColor',
      'inherit': 'inherit',
      'primary': {
        DEFAULT: '#BC87FCff',
        'variant': '#3400B4'
      },  
      'secondary': {
        DEFAULT: '#00DBC7',
      },
      'grey': {
        'light': '',
        DEFAULT: '#242424',
        'darker': '#0A0A0A'
      },   
      'white':{
        DEFAULT: '#FFFFFF',
        'platinum': '#E2E2E2ff'
      },
      'error':{
        DEFAULT: '#D0667A'
      },
    },
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
    extend: {},
  },
  plugins: [],
}