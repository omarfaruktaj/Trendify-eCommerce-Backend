const { reviewController } = require('../controllers');
const router = require('express').Router({ mergeParams: true });
const protect = require('../middlewares/protect');

router.get('/', reviewController.getAllReviews);
router.get('/:reviewId', reviewController.getAReview);

router.use(protect);

router.post('/', reviewController.createReview);
router
	.route('/:reviewId')
	.patch(reviewController.updateReview)
	.delete(reviewController.deleteReview);

module.exports = router;
