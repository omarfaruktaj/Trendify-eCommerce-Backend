const {
	register,
	login,
	logout,
	refreshAccessToken,
	changeCurrentPassword,
} = require('./authController');

const authController = {
	register,
	login,
	logout,
	refreshAccessToken,
	changeCurrentPassword,
};

module.exports = {
	authController,
};
