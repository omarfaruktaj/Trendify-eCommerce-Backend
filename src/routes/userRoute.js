const router = require('express').Router();
const { userController } = require('../controllers');
const { protect, validatePermission } = require('../middlewares');

router.use(protect);
router.get('/me', userController.getMe);
router.patch('/update-me', userController.updateMe);
router.post('/update-avatar', userController.updateMyAvatar);

router.use(validatePermission('ADMIN'));

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getAUser);
module.exports = router;
