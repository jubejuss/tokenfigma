const colors = require('./tokens/tokensHex.js');

module.exports = {
  content: ['./src/**/*.{html,js}', './src/index.html'],
  theme: {
    extend: {
      backgroundColor: {
        primary: colors.primary,
        secondary: colors.secondary,
      },
      textColor: {
        primary: colors.primary,
        secondary: colors.secondary,
      },
      borderColor: {
        primary: colors.primary,
        secondary: colors.secondary,
      },
    },
  },
  plugins: [],
};
