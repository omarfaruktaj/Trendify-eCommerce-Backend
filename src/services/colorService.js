const { Color } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getAllColors = () => {
	return Color.find({});
};
const createColor = ({ name, colorCode }) => {
	return Color.create({ name, colorCode });
};
const updateAColor = catchAsync(async (colorId, { name, colorCode }) => {
	const color = Color.findById(colorId);

	if (!color) throw new AppError('No color found', 404);
	return Color.findByIdAndUpdate(colorId, { name, colorCode });
});

module.exports = {
	getAllColors,
	createColor,
	updateAColor,
};
