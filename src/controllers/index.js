const { register, login, logout } = require('./authController');

const authController = {
	register,
	login,
	logout,
};

module.exports = {
	authController,
};
