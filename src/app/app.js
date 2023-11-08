const express = require('express');
const dotenv = require('dotenv');

const middlewares = require('./middlewares');
const appRoutes = require('./routes');
const AppError = require('../utils/appError');
const { globalErrorHandler } = require('../middlewares');

dotenv.config();

const app = express();

//Middlewares
app.use(middlewares);

//Routes
app.use('/api/v1', appRoutes);

// Check health
app.get('/health', (_req, res, _next) => {
	res.status(200).json({
		success: true,
	});
});

//Handle unknown routes
app.all('*', (req, _res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} in this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
