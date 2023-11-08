const router = require('express').Router();

const { authRoute } = require('../routes');

router.use('/auth', authRoute);

module.exports = router;
