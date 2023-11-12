const { Cart } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getAProduct } = require('./productService');

const addProductToCart = catchAsync(
	async (userId, { productId, quantity, selectedColor, selectedSize }) => {
		const cart = await Cart.findOne({ user: userId });

		const product = await getAProduct('id', productId);

		if (!product) throw new AppError('No product found', 404);

		const { priceAfterDiscount } = product;

		if (cart) {
			// check is product exist in cart or not
			const indicesFound = cart.items.reduce((acc, item, index) => {
				if (item.product.toString() === productId.toString()) acc.push(index);
				return acc;
			}, []);

			if (indicesFound.length > 0) {
				indicesFound.forEach((indexFound) => {
					if (quantity <= 0) {
						cart.items.splice(indexFound, 1);
					} else if (
						cart.items[indexFound].selectedColor.toString() ===
							selectedColor.toString() &&
						cart.items[indexFound].selectedSize.toString() ===
							selectedSize.toString()
					) {
						// In case the product exists in the cart and has the same color and size.
						cart.items[indexFound].totalProductQuantity += quantity;
						cart.items[indexFound].totalProductPrice +=
							priceAfterDiscount * quantity;

						cart.totalQuantity += quantity;
						cart.totalPrice += priceAfterDiscount * quantity;
					} else if (quantity >= 0) {
						cart.items.push({
							selectedColor,
							selectedSize,
							product: productId,
							totalProductQuantity: quantity,
							TotalProductPrice: priceAfterDiscount * quantity,
						});

						cart.totalQuantity += quantity;
						cart.totalPrice += priceAfterDiscount * quantity;
					} else {
						throw new AppError('Invalid request.', 400);
					}
				});
			}

			await cart.save();

			return cart;
		}

		// In case user dose not have cart. create a new car for user.
		const cartData = {
			user: userId,
			items: [
				{
					selectedColor,
					selectedSize,
					product: productId,
					totalProductQuantity: quantity,
					TotalProductPrice: priceAfterDiscount * quantity,
				},
			],

			totalQuantity: quantity,
			totalPrice: priceAfterDiscount * quantity,
		};

		return Cart.create(cartData);
	},
);

const getCart = (userId) => {
	return Cart.findOne({ user: userId });
};

const increaseByOne = catchAsync(
	async (userId, { productId, selectedColor, selectedSize }) => {
		const cart = await Cart.findOne({ user: userId });

		if (!cart) throw new AppError('No cart found', 404);

		const product = await getAProduct('id', productId);

		if (!product) throw new AppError('No product found', 404);

		const { priceAfterDiscount } = product;

		const indicesFound = cart.items.reduce((acc, item, index) => {
			if (item.product.toString() === productId.toString()) acc.push(index);
			return acc;
		}, []);

		if (indicesFound.length === 0)
			throw new AppError("Can't find this product in cart", 404);

		for (const indexFound of indicesFound) {
			if (
				cart.items[indexFound].selectedColor.toString() ===
					selectedColor.toString() &&
				cart.items[indexFound].selectedSize.toString() ===
					selectedSize.toString()
			) {
				cart.items[indexFound].totalProductQuantity += 1;
				cart.items[indexFound].totalProductPrice += priceAfterDiscount * 1;

				cart.totalQuantity += 1;
				cart.totalPrice += priceAfterDiscount * 1;
			}
		}

		await cart.save();
		const updatedCart = await Cart.findById(cart._id);

		return updatedCart;
	},
);
const decreaseByOne = catchAsync(
	async (userId, { productId, selectedColor, selectedSize }) => {
		const cart = await Cart.findOne({ user: userId });

		if (!cart) throw new AppError('No cart found', 404);

		const product = await getAProduct('id', productId);

		if (!product) throw new AppError('No product found', 404);

		const { priceAfterDiscount } = product;

		const indicesFound = cart.items.reduce((acc, item, index) => {
			if (item.product.toString() === productId.toString()) acc.push(index);
			return acc;
		}, []);

		if (indicesFound.length === 0)
			throw new AppError("Can't find this product in cart", 404);

		for (const indexFound of indicesFound) {
			if (
				cart.items[indexFound].totalProductQuantity === 1 &&
				cart.items[indexFound].selectedColor.toString() ===
					selectedColor.toString() &&
				cart.items[indexFound].selectedSize.toString() ===
					selectedSize.toString()
			) {
				cart.totalQuantity -= 1;
				cart.totalPrice -= priceAfterDiscount;
				cart.items.splice(indexFound, 1);
			} else if (
				cart.items[indexFound].selectedColor.toString() ===
					selectedColor.toString() &&
				cart.items[indexFound].selectedSize.toString() ===
					selectedSize.toString()
			) {
				cart.items[indexFound].totalProductQuantity -= 1;
				cart.items[indexFound].totalProductPrice -= priceAfterDiscount * 1;

				cart.totalQuantity -= 1;
				cart.totalPrice -= priceAfterDiscount * 1;
			}
		}

		await cart.save();
		const updatedCart = await Cart.findById(cart._id);

		return updatedCart;
	},
);

const deleteItem = catchAsync(
	async (userId, { productId, selectedColor, selectedSize }) => {
		const cart = await Cart.findOne({ user: userId });

		if (!cart) throw new AppError('No cart found', 404);

		const product = await getAProduct('id', productId);

		if (!product) throw new AppError('No product found', 404);

		const { priceAfterDiscount } = product;

		const indicesFound = cart.items.reduce((acc, item, index) => {
			if (item.product.toString() === productId.toString()) acc.push(index);
			return acc;
		}, []);

		if (indicesFound.length === 0)
			throw new AppError("Can't find this product in cart", 404);

		for (const indexFound of indicesFound) {
			if (
				cart.items[indexFound].selectedColor.toString() ===
					selectedColor.toString() &&
				cart.items[indexFound].selectedSize.toString() ===
					selectedSize.toString()
			) {
				cart.totalQuantity -= 1;
				cart.totalPrice -=
					priceAfterDiscount * cart.items[indexFound].totalProductQuantity;
				cart.items.splice(indexFound, 1);
			}
		}

		await cart.save();
		const updatedCart = await Cart.findById(cart._id);

		return updatedCart;
	},
);

const deleteCart = catchAsync(async (userId) => {
	const cart = await Cart.findOne({ user: userId });

	if (!cart) throw new AppError('No cart found', 404);

	return Cart.findByIdAndDelete(cart._id);
});

module.exports = {
	addProductToCart,
	getCart,
	increaseByOne,
	decreaseByOne,
	deleteItem,
	deleteCart,
};
