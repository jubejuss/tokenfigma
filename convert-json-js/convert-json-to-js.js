// convert-json-to-js.js
const fs = require('fs');
const path = require('path');

const inputFilePath = path.resolve(__dirname, 'colors.json');
const outputFilePath = path.resolve(__dirname, 'colors.js');

const jsonData = require(inputFilePath);
const jsData = `module.exports = ${JSON.stringify(jsonData, null, 2)};`;

fs.writeFileSync(outputFilePath, jsData, 'utf8');
console.log('JSON file converted to JS module successfully.');
