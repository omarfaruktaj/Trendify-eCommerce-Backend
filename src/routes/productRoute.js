const router = require('express').Router();

const { productController } = require('../controllers');
const { protect, validatePermission } = require('../middlewares');

router.get('/s/:slug', productController.getProductBySlug);

router
	.route('/')
	.get(productController.getAllProducts)
	.post(protect, validatePermission('ADMIN'), productController.createProduct);

router
	.route('/:productId')
	.get(productController.getProductById)
	.patch(protect, validatePermission('ADMIN'), productController.updateProduct)
	.delete(
		protect,
		validatePermission('ADMIN'),
		productController.deleteProduct,
	);

router.patch(
	'/:productId/update-images',
	protect,
	validatePermission('ADMIN'),
	productController.updateProductImage,
);

module.exports = router;
