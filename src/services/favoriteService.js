const { Favorite } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getAProduct } = require('./productService');

const addFavoriteProduct = catchAsync(async (userId, productId) => {
	const product = await getAProduct('id', productId);

	if (!product) throw new AppError('No product found.', 404);

	const favorite = await Favorite.findOne({ user: userId });

	if (favorite) {
		if (favorite.products.includes(productId))
			throw new AppError('Product already exist in favorite', 400);

		favorite.products.push(productId);

		await favorite.save();

		return favorite;
	}

	const createdFavorite = await Favorite.create({
		user: userId,
		products: [productId],
	});

	return createdFavorite;
});

const deleteProductFromFavorite = catchAsync(async (userId, productId) => {
	const product = await getAProduct('id', productId);

	if (!product) throw new AppError('No product found.', 404);

	const favorite = await Favorite.findOne({ user: userId });

	if (!favorite) throw new AppError('No favorite list found', 404);

	if (!favorite.products.includes(productId))
		throw new AppError('Not found this product in favorite', 404);

	favorite.products = favorite.products.filter(
		(item) => item.toString() !== productId.toString(),
	);

	await favorite.save();

	return favorite;
});

const checkProductInFavoriteList = catchAsync(async (userId, productId) => {
	const product = await getAProduct('id', productId);

	if (!product) throw new AppError('No product found.', 404);

	const favorite = await Favorite.findOne({ user: userId });

	if (!favorite) throw new AppError('No favorite list found', 404);

	if (!favorite.products.includes(productId))
		throw new AppError('Not found this product in favorite', 404);

	return favorite;
});

const getFavoriteList = catchAsync(async (userId) => {
	const favorite = await Favorite.findOne({ user: userId });

	if (!favorite) throw new AppError('No favorite list found', 404);

	if (favorite.products.length === 0)
		throw new AppError('No product found in favorite', 404);

	return favorite;
});

module.exports = {
	addFavoriteProduct,
	deleteProductFromFavorite,
	checkProductInFavoriteList,
	getFavoriteList,
};
