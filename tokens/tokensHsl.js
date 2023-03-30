const tokens = require('./tokens/light.json');
const tokensDark = require('./tokens/dark.json');

const primaryHue = parseInt(tokens.primary.hue.value);
const secondaryHue = parseInt(tokens.secondary.hue.value);
const primaryHueDark = parseInt(tokensDark.primary.hue.value);

const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));
  return [
    Math.max(0, Math.min(255, r)),
    Math.max(0, Math.min(255, g)),
    Math.max(0, Math.min(255, b)),
  ];
};

function hslToRgb(hsl) {
  const [h, s, l] = hsl.replace(/hsl\(|%|\)/g, '').split(',');
  const [r, g, b] = HSLToRGB(h, s, l);
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');
  return `#${hexR}${hexG}${hexB}`;
}

function processTokens(tokensObj, primaryHueValue, secondaryHueValue) {
  Object.keys(tokensObj).forEach((key) => {
    const shades = tokensObj[key];
    Object.keys(shades).forEach((shadeKey) => {
      const shade = shades[shadeKey];
      if (shade.value.includes('{primary.hue}')) {
        shade.value = shade.value.replace('{primary.hue}', primaryHueValue);
      }
      if (shade.value.includes('{secondary.hue}')) {
        shade.value = shade.value.replace('{secondary.hue}', secondaryHueValue);
      }
      if (shadeKey === 'hue') {
        delete shades.hue;
      }
      if (shade.type === 'color') {
        shade.value = hslToRgb(shade.value);
      }
    });
  });
}

processTokens(tokens, primaryHue, secondaryHue);
processTokens(tokensDark, primaryHueDark);

console.log(tokens, tokensDark);

const primaryColor = {
  100: tokens.primary['100'].value,
  500: tokens.primary['500'].value,
  900: tokens.primary['900'].value,
};
const secondaryColor = {
  100: tokens.secondary['100'].value,
  500: tokens.secondary['500'].value,
  900: tokens.secondary['900'].value,
};
const primaryDarkColor = {
  100: tokensDark.primary['100'].value,
  500: tokensDark.primary['500'].value,
  900: tokensDark.primary['900'].value,
};

module.exports = {
  primary: primaryColor,
  secondary: secondaryColor,
  primaryDark: primaryDarkColor,
};
