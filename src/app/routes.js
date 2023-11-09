const router = require('express').Router();

const { authRoute, userRoute } = require('../routes');

router.use('/auth', authRoute);
router.use('/users', userRoute);

module.exports = router;
