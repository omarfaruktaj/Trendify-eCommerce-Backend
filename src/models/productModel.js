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
		images: [
			{
				public_id: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
			},
		],
		category: {
			type: mongoose.Types.ObjectId,
			ref: 'Category',
		},
		colors: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Color',
			},
		],
		sizes: [
			{
				type: mongoose.Types.ObjectId,
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

productSchema.index({ name: true, slug: true });

productSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'product',
});

productSchema.pre(/^find/, function (next) {
	const populateQuery = [
		{ path: 'colors', select: 'color colorCode' },
		{ path: 'sizes', select: 'size' },
	];
	this.populate(populateQuery);

	next();
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
