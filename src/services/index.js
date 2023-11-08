const {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
} = require('./userService');

const {
	register,
	login,
	logout,
	refreshAccessToken,
} = require('./authService');

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
	refreshAccessToken,
};

module.exports = {
	userService,
	authService,
};
