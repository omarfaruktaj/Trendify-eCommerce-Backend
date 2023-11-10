const {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
	updateUserPassword,
	updateMyAvatar,
	getAllUsers,
	deleteAUser,
	deleteMe,
	assignRole,
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
	deleteAUser,
	deleteMe,
	assignRole,
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
