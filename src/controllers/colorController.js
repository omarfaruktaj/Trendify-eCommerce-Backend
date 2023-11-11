const { colorService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');

const getAllColor = catchAsync(async (req, res, next) => {
	const colors = await colorService.getAllColors();

	res
		.status(200)
		.json(new ApiResponse({ colors }, 'All colors get successfully.'));
});
const createColor = catchAsync(async (req, res, next) => {
	const { name, colorCode } = req.body;
	const color = await colorService.createColor({ name, colorCode });

	res
		.status(200)
		.json(new ApiResponse({ color }, 'Color created successfully.'));
});
const updateColor = catchAsync(async (req, res, next) => {
	const colorId = req.params.colorId;
	const { name, colorCode } = req.body;
	const color = await colorService.updateAColor(colorId, { name, colorCode });

	res
		.status(200)
		.json(new ApiResponse({ color }, 'Color successfully updated.'));
});

module.exports = {
	getAllColor,
	createColor,
	updateColor,
};
