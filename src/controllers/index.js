const {
  register,
  login,
  logout,
  refreshAccessToken,
  changeCurrentPassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
} = require("./authController");

const {
  getAUser,
  getAllUsers,
  getMe,
  updateMe,
  updateMyAvatar,
  assignRole,
  deleteAUser,
  deleteMe,
} = require("./userController");

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  updateProductImage,
} = require("./productController");

const {
  createReview,
  deleteReview,
  getAReview,
  getAllReviews,
  updateReview,
} = require("./reviewController");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("./categoryController");

const { getAllColor, createColor, updateColor } = require("./colorController");
const { getAllSize, createSize, updateSize } = require("./sizeController");

const {
  addProductToCart,
  decreaseByOne,
  deleteCart,
  deleteItem,
  getCart,
  increaseByOne,
} = require("./cartController");

const {
  addFavoriteProduct,
  checkProductInFavoriteList,
  deleteProductFromFavorite,
  getFavoriteList,
} = require("./favoriteController");

const {
  createOrder,
  getAOrder,
  getAllOrders,
  getMyOrders,
  orderStatus,
  cancelOrder,
} = require("./orderController");

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

const reviewController = {
  createReview,
  deleteReview,
  getAReview,
  getAllReviews,
  updateReview,
};

const colorController = {
  getAllColor,
  createColor,
  updateColor,
};

const sizeController = {
  getAllSize,
  createSize,
  updateSize,
};
const cartController = {
  addProductToCart,
  decreaseByOne,
  deleteCart,
  deleteItem,
  getCart,
  increaseByOne,
};

const favoriteController = {
  addFavoriteProduct,
  checkProductInFavoriteList,
  deleteProductFromFavorite,
  getFavoriteList,
};

const orderController = {
  createOrder,
  getAOrder,
  getAllOrders,
  getMyOrders,
  orderStatus,
  cancelOrder,
};

const categoryController = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
module.exports = {
  authController,
  userController,
  productController,
  reviewController,
  colorController,
  sizeController,
  cartController,
  favoriteController,
  orderController,
  categoryController,
};
