const { cartService } = require('../services');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');

// getCart,increaseByOne} = cartService

const addProductToCart = catchAsync(async (req, res, next) => {
	const userId = req.user._id;
	const { product, selectedColor, selectedSize } = req.body;

	if (!product || !selectedColor || !selectedSize)
		return next(
			new AppError('Product, selectedColor and selectedSize is require', 400),
		);

	const cart = await cartService.addProductToCart(userId, {
		selectedColor,
		selectedSize,
		productId: product,
	});

	if (!cart) return next(new AppError('No cart found', 404));

	res
		.status(200)
		.json(new ApiResponse({ cart }, 'Product successfully added in cart.'));
});

const getCart = catchAsync(async (req, res, next) => {
	const userId = req.user._id;

	const cart = await cartService.getCart(userId);

	if (!cart) return next(new AppError('No cart found', 404));

	res.status(200).json(new ApiResponse({ cart }, 'Cart successfully found.'));
});

const increaseByOne = catchAsync(async (req, res, next) => {
	const userId = req.user._id;
	const { product, selectedColor, selectedSize } = req.body;

	if (!product || !selectedColor || !selectedSize)
		return next(
			new AppError('Product, selectedColor and selectedSize is require', 400),
		);

	const cart = await cartService.increaseByOne(userId, {
		selectedColor,
		selectedSize,
		productId: product,
	});

	if (!cart) return next(new AppError('No cart found', 404));

	res
		.status(200)
		.json(new ApiResponse({ cart }, 'Product quantity successfully increase.'));
});

const decreaseByOne = catchAsync(async (req, res, next) => {
	const userId = req.user._id;
	const { product, selectedColor, selectedSize } = req.body;

	if (!product || !selectedColor || !selectedSize)
		return next(
			new AppError('Product, selectedColor and selectedSize is require', 400),
		);

	const cart = await cartService.decreaseByOne(userId, {
		selectedColor,
		selectedSize,
		productId: product,
	});

	if (!cart) return next(new AppError('No cart found', 404));

	res
		.status(200)
		.json(new ApiResponse({ cart }, 'Product quantity successfully decrease.'));
});

const deleteItem = catchAsync(async (req, res, next) => {
	const userId = req.user._id;
	const { product, selectedColor, selectedSize } = req.body;

	if (!product || !selectedColor || !selectedSize)
		return next(
			new AppError('Product, selectedColor and selectedSize is require', 400),
		);

	const cart = await cartService.deleteItem(userId, {
		selectedColor,
		selectedSize,
		productId: product,
	});

	if (!cart) return next(new AppError('No cart found', 404));

	res
		.status(200)
		.json(new ApiResponse({ cart }, 'Product successfully removed.'));
});
const deleteCart = catchAsync(async (req, res, next) => {
	const userId = req.user._id;

	const cart = await cartService.deleteCart(userId);

	if (!cart) return next(new AppError('No cart found', 404));

	res.status(200).json(new ApiResponse({ cart }, 'Cart successfully deleted.'));
});

module.exports = {
	addProductToCart,
	decreaseByOne,
	deleteCart,
	deleteItem,
	getCart,
	increaseByOne,
};
