const mongoose = require('mongoose');
const { OrderStatusEnum, AvailableOrderStatuses } = require('../constants');

const orderSchema = new mongoose.Schema(
	{
		orderItems: {
			type: Array,
			required: true,
		},
		totalPrice: {
			type: Number,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Order must be belong to a user'],
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentStripeId: {
			type: String,
		},
		textPrice: {
			type: Number,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
		shippingAddress: {
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},

			state: {
				type: String,
				required: true,
			},

			country: {
				type: String,
				required: true,
			},
			pinCode: {
				type: Number,
				required: true,
			},
		},
		phone: {
			type: String,
			required: [true, 'Phone is required.'],
		},
		status: {
			type: String,
			enum: AvailableOrderStatuses,
			default: OrderStatusEnum.NotProcessed,
		},
	},
	{ timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
