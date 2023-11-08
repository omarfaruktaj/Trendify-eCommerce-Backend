const {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
} = require('./userService');

const { register, login } = require('./authService');

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
};

module.exports = {
	userService,
	authService,
};
