const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const middlewares = [
	express.json({ limit: '20kb' }),
	cors({ credentials: true }),
	cookieParser(),
	helmet(),
	morgan('tiny'),
];

module.exports = middlewares;
