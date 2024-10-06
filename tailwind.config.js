/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#F5F7FB',
        'custom-color': '#293264',
        'button-bg': '#4D5B9E',
        'custom-br' : '#DBDEF0',
      },
      fontFamily: {
        'karla-font': ['karla', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

