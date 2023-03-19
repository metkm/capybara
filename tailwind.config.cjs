/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontSize: {
        '15xl': '14rem',
        '20xl': '19rem',
        '25xl': '24rem',
        '30xl': '29rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        fadein: 'fade-in 1s ease-in-out'
      }
    },
  },
  plugins: [],
}
