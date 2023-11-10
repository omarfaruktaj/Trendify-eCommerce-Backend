const { uploadFile, destroyFile } = require('../config/cloudinary');
const { User } = require('../models');
const ApiFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const datauri = require('../utils/datauri');

const createUser = catchAsync(async ({ name, email, password }) => {
	const isEmailTaken = await User.isEmailTaken(email);

	if (isEmailTaken) throw new AppError('User already exist.', 409);

	return User.create({ name, email, password });
});

const findUsers = catchAsync(async (filter) => {
	const user = User.find({ ...filter });

	return user;
});

const findUser = catchAsync(async (key, value, selectFields) => {
	if (key === 'id') {
		let user = User.findById(value);

		if (selectFields) user = user.select(selectFields);

		return user;
	}
	let user = User.findOne({ [key]: value });

	if (selectFields) user = user.select(selectFields);

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
	const isEmailTaken = await User.isEmailTaken(email, id);

	if (email && isEmailTaken) throw new AppError('Email is already taken.', 401);

	const user = User.findByIdAndUpdate(
		id,
		{ ...data },
		{ new: true, runValidators: true },
	);

	return user;
});

const updateUserPassword = catchAsync(async (id, password) => {
	const user = await User.findById(id);
	user.password = password;
	return await user.save();
});

const updateMyAvatar = catchAsync(async (user, avatarData) => {
	if (user.avatar.public_id) {
		await destroyFile(user.avatar.public_id);
	}

	const folderName = `Users/avatar`;
	const file = datauri(avatarData).content;
	const avatar = await uploadFile(file, folderName, 600);

	await User.findByIdAndUpdate(user._id, {
		avatar: { public_id: avatar.public_id, url: avatar.secure_url },
	});

	return {
		message: success,
	};
});

const getAllUsers = catchAsync(async (queries) => {
	const features = new ApiFeatures(User.find({}), queries)
		.search()
		.filter()
		.sort()
		.limitFields()
		.paginate();

	return features.query;
});

const deleteMe = catchAsync(async (userId, password) => {
	const user = await User.findById(userId).select('+password');

	const isPasswordCorrect = await user.isPasswordCorrect(password);

	if (!isPasswordCorrect) throw new AppError('Invalid password', 400);

	const avatarId = user.avatar.public_id;

	if (avatarId) {
		await destroyFile(avatarId);
	}

	const deletedUser = await User.findByIdAndDelete(user._id);

	return deletedUser;
});

const deleteAUser = catchAsync(async (userId) => {
	const user = await User.findById(userId);

	if (!user) throw new AppError('No user found with this Id,', 400);

	const avatarId = user.avatar.public_id;

	if (avatarId) {
		await destroyFile(avatarId);
	}

	const deletedUser = await User.findByIdAndDelete(user._id);

	return deletedUser;
});

const assignRole = catchAsync(async (userId, role) => {
	const user = await User.findById(userId);

	if (!user) throw new AppError('No user found with this Id,', 400);

	user.role = role;

	const updatedUser = await user.save();

	return updatedUser;
});

module.exports = {
	createUser,
	findUser,
	findUserByProperties,
	findUsers,
	updateUserById,
	updateUserPassword,
	updateMyAvatar,
	getAllUsers,
	deleteMe,
	deleteAUser,
	assignRole,
};
