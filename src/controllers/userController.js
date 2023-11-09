const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const ApiResponse = require('../utils/apiResponse');

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

const updateMe = catchAsync(async (req, res, next) => {
	const data = req.body;
	const user = req.user;

	const filterData = filterObj(data, 'name', 'email');

	const updatedUser = await userService.updateUserById(user._id, filterData);

	res.status(200).json(
		new ApiResponse(
			{
				user: {
					_id: updatedUser._id,
					name: updatedUser.name,
					email: updatedUser.email,
					role: updatedUser.role,
					isEmailVerified: updatedUser.isEmailVerified,
					avatar: updatedUser.avatar,
				},
			},
			'User info update successfully.',
		),
	);
});

const updateMyAvatar = catchAsync(async (req, res, next) => {
	const avatar = req.avatar;

	if (!avatar) return next(new AppError('Avatar is required', 401));

	await userService.updateMyAvatar(req.user, avatar);

	res.status(200).json(new ApiResponse({}, 'Avatar successfully updated.'));
});

const getMe = catchAsync(async (req, res, next) => {
	const user = await userService.findUser('id', req.user._id);

	res
		.status(200)
		.json(new ApiResponse({ user }, 'Avatar successfully updated.'));
});

const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await userService.getAllUsers(req.query);

	res
		.status(200)
		.json(new ApiResponse({ users }, 'Avatar successfully updated.'));
});
const getAUser = catchAsync(async (req, res, next) => {
	const userId = req.params.id;

	const users = await userService.findUser('id', userId);

	res
		.status(200)
		.json(new ApiResponse({ users }, 'Avatar successfully updated.'));
});

module.exports = {
	updateMyAvatar,
	updateMe,
	getMe,
	getAUser,
	getAllUsers,
};
