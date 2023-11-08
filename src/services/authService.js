const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { createUser, updateUserById, findUser } = require('./userService');
const jwt = require('jsonwebtoken');

const signAccessAndRefreshToken = (id) => {
	const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
	});

	const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
	});

	return {
		accessToken,
		refreshToken,
	};
};

const register = catchAsync(async ({ name, email, password }) => {
	const user = await createUser({ name, email, password });

	const { accessToken, refreshToken } = signAccessAndRefreshToken(user._id);

	await updateUserById(user._id, {
		$push: { refreshToken },
	});

	return {
		user: {
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			isEmailVerified: user.isEmailVerified,
			avatar: user.avatar,
		},
		accessToken,
		refreshToken,
	};
});

const login = catchAsync(async ({ email, password }) => {
	const user = await findUser('email', email, ['+password']);

	if (!user || !(await user.isPasswordCorrect(password)))
		throw new AppError('Incorrect email or password.', 400);

	const { accessToken, refreshToken } = signAccessAndRefreshToken(user._id);

	await updateUserById(user._id, {
		$push: { refreshToken },
	});

	return {
		user: {
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			isEmailVerified: user.isEmailVerified,
			avatar: user.avatar,
		},
		accessToken,
		refreshToken,
	};
});
const logout = catchAsync(async ({ userId, token }) => {
	const user = await findUser('id', userId);

	if (!user || !user.refreshToken.includes(token)) return null;

	await updateUserById(userId, {
		$pull: { refreshToken: token },
	});

	return {
		user,
	};
});

module.exports = {
	register,
	login,
	logout,
};
