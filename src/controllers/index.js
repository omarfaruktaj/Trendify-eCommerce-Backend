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
	assignRole,
	deleteAUser,
	deleteMe,
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
	assignRole,
	deleteAUser,
	deleteMe,
};
module.exports = {
	authController,
	userController,
};
