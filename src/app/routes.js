const router = require('express').Router();

const {
	authRoute,
	userRoute,
	productRoute,
	colorRoute,
	sizeRoute,
	cartRoute,
	favoriteRoute,
	orderRoute,
} = require('../routes');

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/colors', colorRoute);
router.use('/sizes', sizeRoute);
router.use('/cart', cartRoute);
router.use('/favorite', favoriteRoute);
router.use('/orders', orderRoute);

module.exports = router;
