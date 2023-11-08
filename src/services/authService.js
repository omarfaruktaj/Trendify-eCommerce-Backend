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

	const updatedUser = await updateUserById(user._id, {
		$push: { refreshToken },
	});

	return {
		user: {
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			role: updatedUser.role,
			isEmailVerified: updatedUser.isEmailVerified,
			avatar: updatedUser.avatar,
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

	const updatedUser = await updateUserById(user._id, {
		$push: { refreshToken },
	});
	console.log(updatedUser);
	return {
		user: {
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			role: updatedUser.role,
			isEmailVerified: updatedUser.isEmailVerified,
			avatar: updatedUser.avatar,
		},
		accessToken,
		refreshToken,
	};
});

module.exports = {
	register,
	login,
};
