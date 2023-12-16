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
} = require("./userService");

const { createColor, getAllColors, updateAColor } = require("./colorService");
const { createSize, getAllSizes, updateASize } = require("./sizeService");

const {
  register,
  login,
  logout,
  refreshAccessToken,
  changeCurrentPassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
} = require("./authService");

const {
  createProduct,
  deleteProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  updateProductImages,
  updateProductInternal,
} = require("./productService");

const {
  createReview,
  deleteReview,
  getAReviewById,
  getAllReviews,
  updateReview,
} = require("./reviewService");

const {
  addProductToCart,
  decreaseByOne,
  deleteCart,
  deleteItem,
  getCart,
  increaseByOne,
} = require("./cartService");

const {
  addFavoriteProduct,
  checkProductInFavoriteList,
  deleteProductFromFavorite,
  getFavoriteList,
} = require("./favoriteService");

const {
  createOrder,
  getAOrder,
  getAllOrders,
  getMyOrders,
  orderStatus,
  cancelOrder,
} = require("./orderService");
const {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} = require("./categoryService");

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
  updateProductInternal,
};

const reviewService = {
  createReview,
  deleteReview,
  getAReviewById,
  getAllReviews,
  updateReview,
};

const colorService = {
  createColor,
  getAllColors,
  updateAColor,
};

const sizeService = {
  createSize,
  getAllSizes,
  updateASize,
};

const cartService = {
  addProductToCart,
  decreaseByOne,
  deleteCart,
  deleteItem,
  getCart,
  increaseByOne,
};

const favoriteService = {
  addFavoriteProduct,
  checkProductInFavoriteList,
  deleteProductFromFavorite,
  getFavoriteList,
};

const orderService = {
  cancelOrder,
  createOrder,
  getAOrder,
  getAllOrders,
  getMyOrders,
  orderStatus,
};

const categoryService = {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
};

module.exports = {
  userService,
  authService,
  productService,
  reviewService,
  colorService,
  sizeService,
  cartService,
  favoriteService,
  orderService,
  categoryService,
};
