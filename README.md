# Juhend

## Tailwindi install (PostCSS pluginana)

**NB!** vaata lisaks PostCSS-ile täpsemat seadistust Tailwind CLI installeerimisjuhiste alt (kodulehelt)

Tailwindi käivitamiseks on vaja skriptide alla lisada see (õigete radadega):

```json
    "build-css": "tailwindcss -i ./src/main.css -o ./dist/css/main.css"
```

## muutujate importimine tailwind.config.js-i

### Muutujate fail `tokens.js`:

```javascript
module.exports = {
  primaryColor: {
    100: '#EBF8FF',
    200: '#BEE3F8',
    // ...
  },
  secondaryColor: {
    100: '#F0FFF4',
    200: '#C6F6D5',
    // ...
  },
};
```

### Loen muutujate faili tailwind.config.js-i

```javascript
const { primaryColor, secondaryColor } = require('./tokens/tokens.js');
console.log(primaryColor);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './src/index.html'],
  theme: {
    extend: {
      backgroundColor: {
        primary: primaryColor,
        secondary: secondaryColor,
      },
      textColor: {
        primary: primaryColor,
        secondary: secondaryColor,
      },
    },
  },
  plugins: [],
};
```

Ja, et süsteem need asjad sisse loen, jooksutan terminalis käsklust `node tailwind.config.js` selle võib package.json-isse ka panna

Nüüd võiks testida, kas töötab.

TÖÖTAB!

### Figmast -> json –> js

Eksportisin Figma tokenist js'i. Kõigepealt importisin jsoni otse tailwind.config.js-i, kus konvertisin jsoni andmed javascripti objektideks:

```json
{
  "primary": {
    "100": {
      "value": "#ddd9f2",
      "type": "color"
    },
    "500": {
      "value": "#5540bf",
      "type": "color"
    },
    "900": {
      "value": "#110d26",
      "type": "color"
    }
  }
}
```

```javascript
const colorsJson = require('./tokens.json');

const primaryColor = {
  100: colorsJson.primary['100'].value,
  500: colorsJson.primary['500'].value,
  900: colorsJson.primary['900'].value,
};

module.exports = {
  primary: primaryColor,
};
```

```javascript
const colors = require('./tokens/tokens.js');

module.exports = {
  content: ['./src/**/*.{html,js}', './src/index.html'],
  theme: {
    extend: {
      backgroundColor: {
        primary: colors.primary,
      },
      textColor: {
        primary: colors.primary,
      },
      borderColor: {
        primary: colors.primary,
      },
    },
  },
  plugins: [],
};
```

"secondary" värvide lisamiseks peab lihtsalt lisama:

```json
{
  "primary": {
    "100": {
      "value": "#ddd9f2",
      "type": "color"
    },
    "500": {
      "value": "#5540bf",
      "type": "color"
    },
    "900": {
      "value": "#110d26",
      "type": "color"
    }
  },
  "secondary": {
    "100": {
      "value": "#e0a7b4",
      "type": "color"
    },
    "500": {
      "value": "#c43c3c",
      "type": "color"
    },
    "900": {
      "value": "#530000",
      "type": "color"
    }
  }
}
```

```javascript
const colorsJson = require('./tokens.json');
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
```

```javascript
const colors = require('./tokens/tokens.js');

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
```

Kuna Figmas kasutan HSL-i värvimoodulit ja värvide väärtusi tuletan matemaatiliselt, tulevad need ka jsoniga valemitena.
Seega peab konverteerima need veebis kasutatavaks.
HEX-i konvertimiseks vaja paigaldada ka:

```
npm install color-convert
```

Nüüd loon faili, mis asendab jsonis muutuja seal samas oleva numbriga ja konverdib lõpptulemuse HEX värviks.

```javascript
// parsedColors.js

const colors = require('./colors.json');
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
```

## töötav lahendus

Töötav lahendus on tokensHsl-working-one-theme.js, mis töötab koos tokensHsl.json-iga. See setup on ühe teema jaoks.

## kahe teemaga lahendus

vt diplimitöö dokust

## Custom css 
Et enda loodud css, mis on mitmes failis, tööle hakkaks, tuleks installeerida PostCSS-import moodul:
`npm install -D postcss-import`

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  }
}
```
**NB! Oluline sel juhul, et peamises css failsi oleksid @import lingid faili alguses
**
vt: https://tailwindcss.com/docs/using-with-preprocessors#build-time-imports
