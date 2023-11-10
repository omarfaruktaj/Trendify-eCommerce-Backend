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

const {
	createProduct,
	deleteProduct,
	getAProduct,
	getAllProducts,
	updateProduct,
	updateProductImages,
} = require('./productService');

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

const productService = {
	createProduct,
	deleteProduct,
	getAProduct,
	getAllProducts,
	updateProduct,
	updateProductImages,
};

module.exports = {
	userService,
	authService,
	productService,
};
