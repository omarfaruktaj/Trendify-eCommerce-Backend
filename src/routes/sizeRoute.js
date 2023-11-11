const router = require('express').Router();
const validatePermission = require('../middlewares/validatePermission');
const { sizeService } = require('../services');

router.use(validatePermission);
router
	.route('/')
	.get(sizeService.getAllSizes)
	.post(sizeService.createSize)
	.patch(sizeService.updateASize);

module.exports = router;
