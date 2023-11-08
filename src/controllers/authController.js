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

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new AppError('Email and password are required .'));

	const { user, accessToken, refreshToken } = await authService.login({
		email,
		password,
	});

	sendToken(req, res, { accessToken, refreshToken });

	res
		.status(200)
		.json(
			new ApiResponse(
				{ user, accessToken, refreshToken },
				'User successfully login.',
			),
		);
});
const logout = catchAsync(async (req, res, next) => {
	let token;
	const { refreshToken } = req.body;
	const userId = req.user._id;
	token = refreshToken || req.cookies.refreshToken;

	if (!token) return next(new AppError('Refresh token is required', 400));

	const user = await authService.logout({ userId, token });

	if (!user) return new AppError('Invalid refresh token or user not found');

	const options = {
		httpOnly: true,
		secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
	};

	res
		.status(200)
		.clearCookie('accessToken', options)
		.clearCookie('refreshToken', options)
		.json(new ApiResponse({}, 'User successfully logout'));
});

module.exports = {
	register,
	login,
	logout,
};
