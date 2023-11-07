const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			minLength: 10,
			maxLength: 120,
			required: [true, 'Please provide a product name.'],
		},
		slug: {
			type: String,
			trim: true,
			unique: true,
			required: [true, 'Please provide a slug'],
		},
		description: {
			type: String,
			minLength: 20,
			maxLength: 500,
			trim: true,
			required: [true, 'Please provide a product description.'],
		},
		category: {
			type: mongoose.Types.ObjectId,
			ref: 'Category',
		},
		color: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Color',
			},
		],
		size: [
			{
				type: mongoose.types.ObjectId,
				ref: 'Size',
			},
		],
		price: {
			type: Number,
			required: [true, 'Please provide price.'],
		},
		priceAfterDiscount: {
			type: Number,
			required: true,
		},
		priceDiscount: {
			type: Number,
			validate: {
				validator: function (value) {
					return value < this.price;
				},
				message: (value) =>
					`Discount price ${value} should be below regular price.`,
			},
		},
		quantity: {
			type: Number,
			required: [true, 'Please provide product quantity.'],
			default: 0,
		},
		isOutOfStock: {
			type: Boolean,
			default: false,
		},
		sold: {
			type: Number,
			default: 0,
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: 1,
			max: 5,
			set: (val) => Math.round(val * 10) / 10,
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
