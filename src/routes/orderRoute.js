const { protect, validatePermission } = require('../middlewares');
const { orderController } = require('../controllers');
const { UserRolesEnum } = require('../constants');
const router = require('express').Router();

router.use(protect);

router.get('/my-orders', orderController.getMyOrders);
router
	.post('/')
	.post(orderController.createOrder)
	.get(validatePermission(UserRolesEnum.ADMIN), orderController.getAllOrders);

router
	.route('/:orderId')
	.get(orderController.cancelOrder)
	.get(validatePermission(UserRolesEnum.ADMIN), orderController.getAOrder)
	.patch(validatePermission(UserRolesEnum.ADMIN), orderController.orderStatus);
module.exports = router;
