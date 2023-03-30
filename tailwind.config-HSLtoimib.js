const tokens = require('./tokens/tokensHsl.js');
console.log(tokens);

module.exports = {
  content: ['./src/**/*.{html,js}', './src/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: tokens.primary['100'].value,
          500: tokens.primary['500'].value,
          900: tokens.primary['900'].value,
        },
      },
    },
  },
  plugins: [],
};
