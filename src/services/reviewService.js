const { Review } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
const { getAProduct } = require('./productService');

const getAllReviews = catchAsync(async (productId, queryString) => {
	const product = await getAProduct('id', productId);

	if (!product) throw new AppError('No product found', 404);

	const features = new ApiFeatures(
		Review.find({ product: product._id }),
		queryString,
	)
		.filter()
		.limitFields()
		.sort()
		.paginate();

	return features.query;
});

const getAReviewById = catchAsync(async (productId, reviewId) => {
	const product = await getAProduct('id', productId);

	if (!product) throw new AppError('No product found', 404);

	return Review.findById(reviewId);
});

const createReview = catchAsync(
	async ({ userId, productId, review, rating }) => {
		const product = await getAProduct('id', productId);

		if (!product) throw new AppError('No product found.', 404);

		const isReviewGiven = Review.findOne({ user: userId, product: productId });

		if (isReviewGiven)
			throw new AppError('Sorry, you cannot write more than one review.');

		return Review.create({
			review,
			rating,
			user: userId,
			product: productId,
		});
	},
);

const updateReview = catchAsync(async (reviewId, { review, rating }) => {
	const reviewDoc = await Review.findById(reviewId);

	if (!reviewDoc) throw new AppError('No Review found with this id', 404);

	return Review.findByIdAndUpdate(
		reviewId,
		{
			review,
			rating,
		},
		{ new: true, runValidators: true },
	);
});

const deleteReview = catchAsync(async (reviewId, userId) => {
	const review = await Review.findById(reviewId);

	if (review.user !== userId)
		throw new AppError('You have not permission to delete this review.', 401);

	return Review.findByIdAndDelete(review, { new: true });
});

module.exports = {
	createReview,
	getAReviewById,
	getAllReviews,
	updateReview,
	deleteReview,
};
