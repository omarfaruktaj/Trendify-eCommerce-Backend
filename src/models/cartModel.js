const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Cart must be belong to a user'],
		},
		items: [
			{
				product: {
					type: mongoose.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				selectedColor: {
					type: mongoose.Types.ObjectId,
					ref: 'Color',
					required: true,
				},
				selectedSize: {
					type: mongoose.Types.ObjectId,
					ref: 'Size',
					required: true,
				},
				totalProductQuantity: {
					type: Number,
					required: true,
				},
				TotalProductPrice: {
					type: Number,
					required: true,
				},
			},
		],
		totalPrice: {
			type: Number,
			required: true,
		},
		totalQuantity: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
