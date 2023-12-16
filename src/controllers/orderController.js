const { paymentMethodEnum, OrderStatusEnum } = require("../constants");
const { orderService } = require("../services");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/apiResponse");

// const {cancelledOrder,createOrder,getAOrder,getAllOrders,getMyOrders,orderStatus} = orderService

const createOrder = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const {
    paymentMethod,
    token,
    textPrice,
    shippingPrice,
    shippingAddress,
    phone,
  } = req.body;

  const { address, city, state, country, pinCode } = shippingAddress;

  if (
    !paymentMethod ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !country ||
    !pinCode
  )
    return next(
      new AppError(
        "PaymentMethod, phone ,address, city, state, country, pinCode are require",
        400
      )
    );

  if (paymentMethod === paymentMethodEnum.Stripe && !token)
    return next(new AppError("Token is require", 400));

  const order = await orderService.createOrder(userId, {
    paymentMethod,
    token,
    textPrice,
    shippingPrice,
    shippingAddress,
    phone,
  });

  res.status(201).json(new ApiResponse(order, "Successfully order created."));
});

const getMyOrders = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const order = await orderService.getMyOrders(userId);

  if (!order) return next(new AppError("No order found.", 404));

  res.status(200).json(new ApiResponse({ order }, "Order find successfully."));
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const query = req.query;

  const order = await orderService.getAllOrders(query);

  if (!order) return next(new AppError("No order found.", 404));

  res.status(200).json(new ApiResponse(order, "Orders find successfully."));
});

const getAOrder = catchAsync(async (req, res, next) => {
  const orderId = req.prams.orderId;

  const order = await orderService.getAOrder(orderId);

  if (!order) return next(new AppError("No order found.", 404));

  res.status(200).json(new ApiResponse(order, "Order find successfully."));
});

const cancelOrder = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const orderId = req.params.orderId;

  const order = await orderService.cancelledOrder(userId, orderId);

  if (!order) return next(new AppError("No order found.", 404));

  res.status(200).json(new ApiResponse(order, "Order cancelled successfully."));
});

const orderStatus = catchAsync(async (req, res, next) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  if (!OrderStatusEnum.includes(status))
    return next(new AppError("Invalid order status", 400));

  const order = await orderService.orderStatus(orderId, status);

  if (!order) return next(new AppError("No order found.", 404));

  res
    .status(200)
    .json(new ApiResponse(order, "Order status update successfully."));
});

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getAOrder,
  cancelOrder,
  orderStatus,
};
