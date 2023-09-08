/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js}"],
  theme: {
    extend: {
      fontFamily:{
        'bricolage':['Bricolage Grotesque','sans-serif']
      },
      letterSpacing:{
        '-5px': '-5px'
      }
    },
  },
  plugins: [],
}

