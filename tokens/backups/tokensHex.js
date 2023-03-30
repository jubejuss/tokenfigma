const colorsJson = require('./tokensHex.json');
console.log(colorsJson);

const primaryColor = {
  100: colorsJson.primary['100'].value,
  500: colorsJson.primary['500'].value,
  900: colorsJson.primary['900'].value,
};
const secondaryColor = {
  100: colorsJson.secondary['100'].value,
  500: colorsJson.secondary['500'].value,
  900: colorsJson.secondary['900'].value,
};

module.exports = {
  primary: primaryColor,
  secondary: secondaryColor,
};
