const sendDevError = (err, _req, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		error: err,
	});
};

const sendProdError = (err, _req, res) => {
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	res.status(500).json({
		status: 'error',
		message: 'Something went very wrong!',
	});
};

module.exports = (err, req, res, _next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		sendDevError(err, req, res);
	} else if (process.env.NODE_ENV === 'production') {
		sendProdError(err, req, res);
	}
};
