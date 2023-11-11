const { Size } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getAllSizes = () => {
	return Size.find({});
};

const createSize = (size) => {
	return Size.create({ size });
};

const updateASize = catchAsync((sizeId, size) => {
	const sizeDoc = Size.findById(sizeId);

	if (!sizeDoc) throw new AppError('No size found', 404);
	return Size.findByIdAndUpdate(sizeId, { size });
});

module.exports = {
	getAllSizes,
	createSize,
	updateASize,
};
