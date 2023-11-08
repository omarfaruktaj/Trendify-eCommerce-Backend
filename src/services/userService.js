const { User } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async ({ name, email, password }) => {
	const isEmailTaken = await User.isEmailTaken(email);

	if (isEmailTaken) throw new AppError('User already exist.', 409);

	return User.create({ name, email, password });
});

const findUsers = catchAsync(async (filter) => {
	const user = User.find({ ...filter });
	if (user.length === 0) throw new AppError('User not found.', 404);
	return user;
});

const findUser = catchAsync(async (key, value) => {
	if (key === 'id') {
		const user = await User.findById(value);
		if (!user) throw new AppError('User not found.', 404);
		return user;
	}
	const user = User.findOne({ [key]: value });
	if (!user) throw new AppError('User not found.', 404);
	return user;
});

const findUserByProperties = catchAsync(async (properties) => {
	const user = await User.findOne({ ...properties });
	if (!user) throw new AppError('User not found.', 404);
	return user;
});

const updateUserById = catchAsync(async (id, data) => {
	const { password, email } = data;

	if (password)
		throw new AppError(
			'This route is not for password updates. Please use update password option.',
			400,
		);
	const isEmailTaken = User.isEmailTaken(email, id);

	if (email && isEmailTaken) throw new AppError('Email is already taken.', 404);

	const user = await User.findByIdAndUpdate(
		id,
		{ ...data },
		{ new: true, runValidators: true },
	);

	return user;
});

module.exports = {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
};
