const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { sendPasswordResetToken } = require('../utils/email');
const crypto = require('crypto');
const {
	createUser,
	updateUserById,
	findUser,
	updateUserPassword,
	findUserByProperties,
} = require('./userService');
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

const refreshAccessToken = catchAsync(async (refreshToken) => {
	console.log(refreshToken);
	const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

	const user = await findUser('id', decoded.id);

	if (!user || !user.refreshToken.includes(refreshToken))
		throw new AppError('Invalid refresh Token!', 401);

	const { accessToken, refreshToken: newRefreshToken } =
		signAccessAndRefreshToken(user._id);

	await updateUserById(user._id, { $pull: { refreshToken } });

	return {
		accessToken,
		refreshToken: newRefreshToken,
	};
});

const changeCurrentPassword = catchAsync(
	async ({ userId, oldPassword, newPassword }) => {
		const user = await findUser('id', userId, ['+password']);

		const isPasswordValid = await user.isPasswordCorrect(oldPassword);

		if (!isPasswordValid) throw new AppError('Invalid old password', 400);

		await updateUserPassword(userId, newPassword);

		return { success: true };
	},
);

const forgotPassword = catchAsync(async ({ email, protocol, host }) => {
	const user = await findUser('email', email);

	if (!user) throw new AppError('No user found with this email.', 400);

	const resetToken = await user.createPasswordResetToken();
	await user.save();

	const firstName = user.name.split(' ')[0];
	console.log(resetToken, user);

	try {
		const resetUrl = `${protocol}://${host}/api/v1/auth/reset-password/${resetToken}`;
		console.log(resetUrl);
		await sendPasswordResetToken(firstName, user.email, resetUrl);

		return {
			success: true,
		};
	} catch (error) {
		await updateUserById(user._id, {
			passwordResetToken: undefined,
			passwordResetTokenExpire: undefined,
		});

		throw new AppError(
			'There was an error sending the email. Try again later!',
			500,
		);
	}
});

const resetPassword = catchAsync(async (newPassword, token) => {
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

	const user = await findUserByProperties({
		passwordResetToken: hashedToken,
		passwordResetTokenExpire: { $gt: Date.now() },
	});

	if (!user) throw new AppError('Token is invalid or expired', 400);

	await updateUserPassword(user._id, newPassword);

	const { accessToken, refreshToken } = signAccessAndRefreshToken(user._id);

	await updateUserById(user._id, {
		$push: { refreshToken },
		passwordResetToken: undefined,
		passwordResetTokenExpire: undefined,
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

module.exports = {
	register,
	login,
	logout,
	refreshAccessToken,
	changeCurrentPassword,
	forgotPassword,
	resetPassword,
};
