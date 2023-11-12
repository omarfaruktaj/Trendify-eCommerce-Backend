const router = require('express').Router();

const {
	authRoute,
	userRoute,
	productRoute,
	colorRoute,
	sizeRoute,
	cartRoute,
} = require('../routes');

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/colors', colorRoute);
router.use('/sizes', sizeRoute);
router.use('/cart', cartRoute);

module.exports = router;
