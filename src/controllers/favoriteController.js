const { favoriteService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');
const AppError = require('../utils/appError');

const addFavoriteProduct = catchAsync(async (req, res, next) => {
	const userId = req.user._id;
	const { product } = req.body;

	if (!product) return next(new AppError('Product is require.', 400));

	const favorite = await favoriteService.addFavoriteProduct(userId, product);

	if (!favorite) return next(new AppError('No favorite list found', 404));

	res
		.status(200)
		.json(
			new ApiResponse({ favorite }, 'Product successfully added in favorite'),
		);
});
const getFavoriteList = catchAsync(async (req, res, next) => {
	const userId = req.user._id;

	const favorite = await favoriteService.getFavoriteList(userId);

	if (!favorite) return next(new AppError('No favorite list found', 404));

	res
		.status(200)
		.json(new ApiResponse({ favorite }, 'Product successfully get favorite'));
});
const deleteProductFromFavorite = catchAsync(async (req, res, next) => {
	const userId = req.user._id;
	const product = req.params.id;

	if (!product) return next(new AppError('Product is require.', 400));

	const favorite = await favoriteService.deleteProductFromFavorite(
		userId,
		product,
	);

	if (!favorite) return next(new AppError('No favorite list found', 404));

	res
		.status(200)
		.json(
			new ApiResponse(
				{ favorite },
				'Product successfully remove from favorite',
			),
		);
});
const checkProductInFavoriteList = catchAsync(async (req, res, next) => {
	const userId = req.user._id;
	const product = req.params.id;

	if (!product) return next(new AppError('Product is require.', 400));

	const favorite = await favoriteService.checkProductInFavoriteList(
		userId,
		product,
	);

	if (!favorite) return next(new AppError('No favorite list found', 404));

	res
		.status(200)
		.json(
			new ApiResponse({ favorite }, 'Product successfully found in favorite'),
		);
});

module.exports = {
	addFavoriteProduct,
	getFavoriteList,
	deleteProductFromFavorite,
	checkProductInFavoriteList,
};
