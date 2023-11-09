const {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
	updateUserPassword,
	updateMyAvatar,
	getAllUsers,
} = require('./userService');

const {
	register,
	login,
	logout,
	refreshAccessToken,
	changeCurrentPassword,
	forgotPassword,
	resetPassword,
	verifyEmail,
} = require('./authService');

const userService = {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
	updateUserPassword,
	updateMyAvatar,
	getAllUsers,
};
const authService = {
	register,
	login,
	logout,
	refreshAccessToken,
	changeCurrentPassword,
	forgotPassword,
	resetPassword,
	verifyEmail,
};

module.exports = {
	userService,
	authService,
};
