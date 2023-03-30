//const { primaryColor, secondaryColor } = require('./tokens/tokens.js');
const colors = require('./tokens/tokens.json');
console.log(colors);
const primaryColor = {
  100: colors.primary['100'].value,
  500: colors.primary['500'].value,
  900: colors.primary['900'].value,
};

module.exports = {
  content: ['./src/**/*.{html,js}', './src/index.html'],
  theme: {
    extend: {
      backgroundColor: {
        primary: primaryColor,
      },
      textColor: {
        primary: primaryColor,
      },
      borderColor: {
        primary: primaryColor,
      },
    },
  },
  plugins: [],
};
