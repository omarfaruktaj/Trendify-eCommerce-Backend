const DatauriParser = require('datauri/parser');

const parser = new DatauriParser();

const datauri = (file) => parser.format('webp', file.buffer);

module.exports = datauri;
