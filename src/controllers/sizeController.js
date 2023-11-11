const { sizeService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');

const getAllSize = catchAsync(async (req, res, next) => {
	const sizes = await sizeService.getAllSizes();

	res
		.status(200)
		.json(new ApiResponse({ sizes }, 'All sizes get successfully.'));
});
const createSize = catchAsync(async (req, res, next) => {
	const { size } = req.body;
	const sizeDoc = await sizeService.createColor(size);

	res
		.status(200)
		.json(new ApiResponse({ size: sizeDoc }, 'size created successfully.'));
});
const updateSize = catchAsync(async (req, res, next) => {
	const sizeId = req.params.sizeId;
	const { size } = req.body;
	const sizeDoc = await sizeService.updateASize(sizeId, size);

	res
		.status(200)
		.json(new ApiResponse({ size: sizeDoc }, 'Color successfully updated.'));
});

module.exports = {
	getAllSize,
	createSize,
	updateSize,
};
