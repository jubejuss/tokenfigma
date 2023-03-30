# Juhend

## json Tailwindile sobivaks.
Kõigepealt kirjutasin pisikese skripti, mis konverdib json'i js-iks, ehk Tailwind.config.js jaoks sobivaks.

Kõike selle tegevusega seotud failid asuvad folderis **convert-json-js**  

## Tailwindi install (PostCSS pluginana)

**NB!** vaata lisaks PostCSS-ile täpsemat seadistust Tailwind CLI installeerimisjuhiste alt (kodulehelt)

Tailwindi käivitamiseks on vaja skriptide alla lisada see (õigete radadega):
```json
    "build-css": "tailwindcss -i ./src/main.css -o ./dist/css/main.css"
```

## Figma => Style dictionary => Tailwind
Figma tokenid tuleb tõlgendada ümber nii, et Style dictionary aru saaks.
Seleks on uhend siin: https://satellytes.com/blog/post/installing-and-syncing-figma-design-tokens/

### Installi Token transformer
```node
npm install token-transformer
```
Ja käsklus konvertimiseks on see (rajad pead sobivad panema):  
```npx token-transformer tokens.json output.```
Seejärel saab stylescape json-ist aru.  
