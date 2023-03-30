const colors = require('./tokensHsl.json');
const convert = require('color-convert');

function replacePlaceholders(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      replacePlaceholders(obj[key]);
    } else if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace('{primary.hue}', colors.primary.hue.value);
      if (obj[key].startsWith('hsl(')) {
        const [h, s, l] = obj[key].slice(4, -1).split(', ').map(Number);
        obj[key] = convert.hsl.hex(h, s, l);
      }
    }
  }
}

replacePlaceholders(colors);

module.exports = colors;
