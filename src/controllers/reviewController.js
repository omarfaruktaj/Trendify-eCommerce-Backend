const catchAsync = require("../utils/catchAsync");
const { reviewService } = require("../services");
const ApiResponse = require("../utils/apiResponse");
const AppError = require("../utils/appError");

const getAllReviews = catchAsync(async (req, res, _next) => {
  const productId = req.params.productId;

  const reviews = await reviewService.getAllReviews(productId);

  res.status(200).json(new ApiResponse(reviews, "Reviews successfully get."));
});

const getAReview = catchAsync(async (req, res, _next) => {
  const productId = req.params.productId;
  const reviewId = req.params.reviewId;

  const review = await reviewService.getAReviewById(productId, reviewId);

  if (!review) return new AppError("No review found.", 404);

  res.status(200).json(new ApiResponse(review, "Review successfully get."));
});

const createReview = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.params.productId;
  const { review, rating } = req.body;

  if (!review || !rating)
    return next(new AppError("Review and rating are required.", 400));

  if (rating < 1) return next(new AppError("Rating can be less then 1", 400));

  const CreatedReview = await reviewService.createReview({
    userId,
    productId,
    review,
    rating,
  });

  res
    .status(200)
    .json(new ApiResponse(CreatedReview, "Successfully review create"));
});

const updateReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const { review, rating } = req.body;

  if (!review || !rating)
    return next(new AppError("Review and rating are required.", 400));

  if (rating < 1) return next(new AppError("Rating can be less then 1", 400));

  const reviewDoc = await reviewService.updateReview(reviewId, {
    review,
    rating,
  });

  res
    .status(200)
    .json(new ApiResponse(reviewDoc, "Review successfully updated."));
});

const deleteReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const userId = req.user._id;

  const review = await reviewService.deleteReview(reviewId, userId);

  res.status(200).json(new ApiResponse(review, "Review successfully deleted."));
});

module.exports = {
  getAllReviews,
  getAReview,
  createReview,
  updateReview,
  deleteReview,
};
