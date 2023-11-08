const { register, login } = require('./authController');

const authController = {
	register,
	login,
};

module.exports = {
	authController,
};
