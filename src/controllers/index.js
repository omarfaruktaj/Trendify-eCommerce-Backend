const {
	register,
	login,
	logout,
	refreshAccessToken,
} = require('./authController');

const authController = {
	register,
	login,
	logout,
	refreshAccessToken,
};

module.exports = {
	authController,
};
