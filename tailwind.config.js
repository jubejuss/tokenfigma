const colors = require('./tokens/tokensHsl.js');
console.log(colors);

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js}', './src/index.html'],
  theme: {
    extend: {
      backgroundColor: {
        primary: colors.primary,
        secondary: colors.secondary,
        'dark-primary': colors.primaryDark,
      },
      textColor: {
        primary: colors.primary,
        secondary: colors.secondary,
        'dark-primary': colors.primaryDark,
      },
      borderColor: {
        primary: colors.primary,
        secondary: colors.secondary,
        'dark-primary': colors.primaryDark,
      },
    },
  },
  plugins: [],
};
