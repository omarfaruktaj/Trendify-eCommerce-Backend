const { authService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');
const AppError = require('../utils/appError');

const sendToken = (req, res, token) => {
	res
		.cookie('accessToken', token.accessToken, {
			expires: new Date(
				Date.now() +
					process.env.ACCESS_TOKEN_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000,
			),
			httpOnly: true,
			secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
		})
		.cookie('refreshToken', token.refreshToken, {
			expires: new Date(
				Date.now() +
					process.env.REFRESH_TOKEN_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000,
			),
			httpOnly: true,
			secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
		});
};

const register = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password)
		return next(new AppError('Name, email, and password are required .'));

	const { user, accessToken, refreshToken } = await authService.register({
		name,
		email,
		password,
	});

	if (!user)
		return next(
			new AppError('Something went very wrong when registering user!', 500),
		);

	sendToken(req, res, { accessToken, refreshToken });

	res
		.status(201)
		.json(
			new ApiResponse(
				{ user, accessToken, refreshToken },
				'User successfully registered.',
			),
		);
});

module.exports = {
	register,
};
