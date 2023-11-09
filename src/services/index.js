const {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
	updateUserPassword,
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
