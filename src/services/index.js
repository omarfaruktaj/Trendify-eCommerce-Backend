const {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
} = require('./userService');

const { register } = require('./authService');

const userService = {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
};
const authService = {
	register,
};

module.exports = {
	userService,
	authService,
};
