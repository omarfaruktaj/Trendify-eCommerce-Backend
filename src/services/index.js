const {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
} = require('./userService');

const { register, login, logout } = require('./authService');

const userService = {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
};
const authService = {
	register,
	login,
	logout,
};

module.exports = {
	userService,
	authService,
};
