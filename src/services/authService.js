const catchAsync = require('../utils/catchAsync');
const { createUser, updateUserById } = require('./userService');
const jwt = require('jsonwebtoken');

const signAccessAndRefreshToken = (user) => {
	const accessToken = jwt.sign(
		{ id: user._id },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
		},
	);

	const refreshToken = jwt.sign(
		{ id: user._id },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
		},
	);

	return {
		accessToken,
		refreshToken,
	};
};

const register = catchAsync(async ({ name, email, password }) => {
	const user = await createUser({ name, email, password });

	const { accessToken, refreshToken } = signAccessAndRefreshToken(user);

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

module.exports = {
	register,
};
