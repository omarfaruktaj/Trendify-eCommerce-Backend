const router = require('express').Router();

const {
	authRoute,
	userRoute,
	productRoute,
	colorRoute,
	sizeRoute,
} = require('../routes');

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/colors', colorRoute);
router.use('/sizes', sizeRoute);

module.exports = router;
