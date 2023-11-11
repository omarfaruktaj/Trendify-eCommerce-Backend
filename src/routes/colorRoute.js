const router = require('express').Router();
const validatePermission = require('../middlewares/validatePermission');
const { colorService } = require('../services');

router.use(validatePermission);
router
	.route('/')
	.get(colorService.getAllColors)
	.post(colorService.createColor)
	.patch(colorService.updateAColor);

module.exports = router;
