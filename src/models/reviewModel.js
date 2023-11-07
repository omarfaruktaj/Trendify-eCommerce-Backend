const mongoose = require('mongoose');

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

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
