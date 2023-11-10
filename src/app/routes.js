const router = require('express').Router();

const { authRoute, userRoute, productRoute } = require('../routes');

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/products', productRoute);

module.exports = router;
