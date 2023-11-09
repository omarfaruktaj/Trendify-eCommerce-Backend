const {
	register,
	login,
	logout,
	refreshAccessToken,
	changeCurrentPassword,
	forgotPassword,
	resetPassword,
	verifyEmail,
} = require('./authController');

const {
	getAUser,
	getAllUsers,
	getMe,
	updateMe,
	updateMyAvatar,
} = require('./userController');

const authController = {
	register,
	login,
	logout,
	refreshAccessToken,
	changeCurrentPassword,
	forgotPassword,
	resetPassword,
	verifyEmail,
};

const userController = {
	getAUser,
	getAllUsers,
	getMe,
	updateMe,
	updateMyAvatar,
};
module.exports = {
	authController,
	userController,
};
