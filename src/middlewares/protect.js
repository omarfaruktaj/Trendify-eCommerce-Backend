const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const protect = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else {
		token = req.cookies.accessToken;
	}

	if (!token)
		return next(new AppError('You are not login! Please login to access', 401));

	const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

	const currentUser = await userService.findUser('id', decoded.id);

	if (!currentUser)
		return next(
			new AppError(
				'The user belonging to this token does no longer exist.',
				401,
			),
		);

	if (currentUser.passwordChangeAfter(decoded.iat))
		return next(
			new AppError('User recently changed password! Please login again.', 401),
		);

	req.user = currentUser;

	next();
});

module.exports = protect;
