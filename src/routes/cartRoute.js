const router = require('express').Router();
const { protect } = require('../middlewares');
const { cartService } = require('../services');

router.use(protect);

router
	.route('/')
	.get(cartService.getCart)
	.post(cartService.addProductToCart)
	.delete(cartService.deleteCart);

router.patch('/increase-one', cartService.increaseByOne);
router.patch('/reduce-one', cartService.decreaseByOne);

router.delete('/remove-item', cartService.deleteItem);

module.exports = router;
