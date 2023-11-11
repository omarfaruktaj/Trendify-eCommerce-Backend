const { productService } = require('../services');
const ApiResponse = require('../utils/apiResponse');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createProduct = catchAsync(async (req, res, next) => {
	const {
		name,
		slug,
		description,
		images,
		colors,
		sizes,
		price,
		priceDiscount,
		category,
		quantity,
		sold,
		isOutOfStock,
	} = req.body;
	console.log(req.body);

	if (
		!name ||
		!slug ||
		!description ||
		!price ||
		!priceDiscount ||
		!quantity ||
		!sold ||
		!images ||
		images.length === 0
	)
		return next(new AppError('All fields are required', 400));

	const product = await productService.createProduct({
		name,
		slug,
		description,
		images,
		colors,
		sizes,
		price,
		priceDiscount,
		category,
		quantity,
		sold,
		isOutOfStock,
	});

	res
		.status(201)
		.json(new ApiResponse({ product }, 'Product successfully created.'));
});

const updateProduct = catchAsync(async (req, res, next) => {
	const {
		name,
		slug,
		description,
		colors,
		sizes,
		price,
		priceDiscount,
		category,
		quantity,
		sold,
		isOutOfStock,
	} = req.body;
	const productId = req.params.productId;

	const product = await productService.updateProduct(productId, {
		name,
		slug,
		description,
		images,
		colors,
		sizes,
		price,
		priceDiscount,
		category,
		quantity,
		sold,
		isOutOfStock,
	});

	res
		.status(200)
		.json(new ApiResponse({ product }, 'Product successfully updated.'));
});

const updateProductImage = catchAsync(async (req, res, next) => {
	const { images } = req.body;
	const productId = req.params.productId;

	if (images.length == 0) return next(new AppError('Image is required.', 400));

	const product = await productService.updateProduct(productId, images);

	res
		.status(200)
		.json(new ApiResponse({ product }, 'Product images successfully updated.'));
});

const getAllProducts = catchAsync(async (_req, res, _next) => {
	const query = req.query;

	const products = await productService.getAllProducts(query);

	res
		.status(200)
		.json(new ApiResponse({ products }, 'Products found successfully.'));
});

const getProductById = catchAsync(async (req, res, next) => {
	const productId = req.Params.productId;

	const product = await productService.getAProduct('id', productId);

	if (!product) return next(new AppError('No user found with this id.', 400));

	res
		.status(200)
		.json(new ApiResponse({ product }, 'Product found successfully.'));
});

const getProductBySlug = catchAsync(async (req, res, next) => {
	const slug = req.Params.slug;

	const product = await productService.getAProduct('slug', slug);

	if (!product) return next(new AppError('No user found with this slug.', 400));

	res
		.status(200)
		.json(new ApiResponse({ product }, 'Product found successfully.'));
});

const deleteProduct = catchAsync(async (req, res, next) => {
	const productId = req.Params.productId;

	const product = await productService.getAProduct('id', productId);

	if (!product) return next(new AppError('No user found with this id.', 400));

	res.status(200).json(new ApiResponse({}, 'Product successfully deleted.'));
});

module.exports = {
	createProduct,
	updateProduct,
	updateProductImage,
	getAllProducts,
	getProductById,
	getProductBySlug,
	deleteProduct,
};
