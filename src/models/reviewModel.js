const mongoose = require('mongoose');
const { productService } = require('../services');

const reviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Review must be belong to a user'],
		},
		product: {
			type: mongoose.Types.ObjectId,
			ref: 'Product',
			required: [true, 'Review must be belong to a product.'],
		},
		rating: {
			type: Number,
			min: [1, 'Rating must be above 1.0'],
			max: [1, 'Rating must be below 5.0'],
			required: true,
		},
		review: {
			type: String,
			trim: true,
			required: [true, 'Review cannot be empty!'],
		},
	},
	{ timestamps: true },
);
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (productId) {
	const stats = this.aggregate([
		{
			$match: { product: productId },
		},
		{
			$group: {
				_id: '$product',
				nRating: { $sum: 1 },
				avgRating: { $avg: '$rating' },
			},
		},
	]);

	if (stats.length > 0) {
		await productService.updateProductInternal(productId, {
			ratingsQuantity: stats[0].nRating,
			ratingsAverage: stats[0].avgRating,
		});
	} else {
		await productService.updateProductInternal(productId, {
			ratingQuantity: 0,
			ratingsAverage: 4.5,
		});
	}
};

reviewSchema.post('save', function () {
	this.constructor.calcAverageRatings(this.product);
});

reviewSchema.pre(/^findByIdAnd/, async function (next) {
	this.rev = await this.findOne();
	next();
});

reviewSchema.post(/^findByIdAnd/, async function () {
	await this.rev.constructor.calcAverageRatings(this.rev.product);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
