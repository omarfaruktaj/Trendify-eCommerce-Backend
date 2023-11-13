const { protect } = require('../middlewares');
const { favoriteController } = require('../controllers');

const router = require('express').Router();

router.use(protect);

router
	.route('/')
	.post(favoriteController.addFavoriteProduct)
	.get(favoriteController.getFavoriteList);
router.delete('/:id', favoriteController.deleteProductFromFavorite);
router.get('/check/:id', favoriteController.checkProductInFavoriteList);

module.exports = router;
