const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const middlewares = [
	express.json({ limit: '20kb' }),
	cors(),
	helmet(),
	morgan('tiny'),
];

module.exports = middlewares;
