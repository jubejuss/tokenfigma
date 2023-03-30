const colors = require('./convert-json-js/colors.json');
console.log(colors);


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./src/index.html"],
  theme: {
    extend: {
      backgroundColor: colors,
      textColor: colors,
      borderColor: colors,
    },
  },
  plugins: [],
}
