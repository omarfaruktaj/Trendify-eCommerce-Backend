const { authController } = require('../controllers');

const router = require('express').Router();

router.post('/register', authController.register);

module.exports = router;
