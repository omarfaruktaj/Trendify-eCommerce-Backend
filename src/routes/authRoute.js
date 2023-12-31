const { authController } = require('../controllers');
const { protect } = require('../middlewares');

const router = require('express').Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshAccessToken);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);
// Protected routes
router.use(protect);

router.post('/logout', authController.logout);
router.post('/change-password', authController.changeCurrentPassword);

module.exports = router;
