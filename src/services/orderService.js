const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { paymentMethodEnum, OrderStatusEnum } = require('../constants');
const { Order } = require('../models');
const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getCart, deleteCart } = require('./cartService');
const { getAProduct, updateProductInternal } = require('./productService');

const createOrder = catchAsync(
	async (
		userId,
		{ paymentMethod, token, textPrice, shippingPrice, shippingAddress, phone },
	) => {
		const cart = await getCart(userId);

		if (!cart)
			throw new AppError('No cart found. Please add product in cart.', 404);

		const totalPrice = cart.totalPrice + textPrice + shippingPrice;

		if (paymentMethod === paymentMethodEnum.Cash) {
			const order = await Order.create({
				totalPrice,
				textPrice,
				shippingPrice,
				shippingAddress,
				phone,
				user: userId,
				orderItems: cart.items,
				paymentMethod: paymentMethodEnum.Cash,
			});

			for (const item of cart.items) {
				const id = item.product;
				const { totalProductQuantity } = item;

				const product = await getAProduct('id', id);
				const sold = product.sold + totalProductQuantity;
				const quantity = product.quantity - totalProductQuantity;

				await updateProductInternal(id, { sold, quantity });
			}

			await deleteCart(userId);

			return order;
		}

		const charge = await stripe.charges.create({
			amount: totalPrice,
			currency: 'usd',
			description: 'charge for products',
			source: token,
		});

		const order = await Order.create({
			totalPrice,
			textPrice,
			shippingPrice,
			shippingAddress,
			phone,
			user: userId,
			isPaid: true,
			paymentStripeId: charge.id,
			paidAt: Date.now(),
			orderItems: cart.items,
			paymentMethod: paymentMethodEnum.Stripe,
		});

		for (const item of cart.items) {
			const id = item.product;
			const { totalProductQuantity } = item;

			const product = await getAProduct('id', id);
			const sold = product.sold + totalProductQuantity;
			const quantity = product.quantity - totalProductQuantity;

			await updateProductInternal(id, { sold, quantity });
		}

		await deleteCart(userId);

		return order;
	},
);

const orderStatus = catchAsync(async (orderId, status) => {
	const order = await Order.findById(orderId);

	if (!order) throw new AppError('No order found', 404);

	if (status === OrderStatusEnum.Cancelled) {
		for (const item of order.orderItems) {
			const product = await getAProduct('id', item.product);

			if (!product) throw new AppError('No product found', 404);

			await updateProductInternal(product._id, {
				quantity: product.quantity + item.totalProductQuantity,
				sold: product.sold - item.totalProductQuantity,
			});
		}

		const deletedOrder = await Order.findByIdAndDelete(order._id);
		return deletedOrder;
	}

	order.status = status;

	const updateOrder = await order.save();

	return updateOrder;
});

const cancelOrder = catchAsync(async (userId, orderId) => {
	const order = await Order.findById(orderId);

	if (!order) throw new AppError('No order found.', 404);

	if (userId !== order.user)
		throw new AppError('You have not permission for this action.', 401);

	for (const item of order.orderItems) {
		const product = await getAProduct('id', item.product);

		if (!product) throw new AppError('No product found', 404);

		await updateProductInternal(product._id, {
			quantity: product.quantity + item.totalProductQuantity,
			sold: product.sold - item.totalProductQuantity,
		});
	}

	await Order.findByIdAndDelete(order._id);

	return order;
});

const getMyOrders = (userId) => {
	return Order.find({ user: userId });
};
const getAOrder = (orderId) => {
	return Order.findById(orderId);
};

const getAllOrders = (queryString) => {
	const features = new ApiFeatures(Order.find(), queryString)
		.filter()
		.limitFields()
		.sort()
		.paginate();

	return features.query;
};

module.exports = {
	createOrder,
	orderStatus,
	cancelOrder,
	getMyOrders,
	getAOrder,
	getAllOrders,
};
