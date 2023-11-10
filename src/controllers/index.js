const {
	register,
	login,
	logout,
	refreshAccessToken,
	changeCurrentPassword,
	forgotPassword,
	resetPassword,
	verifyEmail,
} = require('./authController');

const {
	getAUser,
	getAllUsers,
	getMe,
	updateMe,
	updateMyAvatar,
	assignRole,
	deleteAUser,
	deleteMe,
} = require('./userController');

const {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	getProductBySlug,
	updateProduct,
	updateProductImage,
} = require('./productController');

const authController = {
	register,
	login,
	logout,
	refreshAccessToken,
	changeCurrentPassword,
	forgotPassword,
	resetPassword,
	verifyEmail,
};

const userController = {
	getAUser,
	getAllUsers,
	getMe,
	updateMe,
	updateMyAvatar,
	assignRole,
	deleteAUser,
	deleteMe,
};

const productController = {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	getProductBySlug,
	updateProduct,
	updateProductImage,
};

module.exports = {
	authController,
	userController,
	productController,
};
