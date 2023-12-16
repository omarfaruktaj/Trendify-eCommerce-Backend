const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const ApiResponse = require("../utils/apiResponse");
const AppError = require("../utils/appError");

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

  const filterData = filterObj(data, "name", "email");

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
      "User info update successfully."
    )
  );
});

const updateMyAvatar = catchAsync(async (req, res, next) => {
  const avatar = req.avatar;

  if (!avatar) return next(new AppError("Avatar is required", 401));

  await userService.updateMyAvatar(req.user, avatar);

  res.status(200).json(new ApiResponse({}, "Avatar successfully updated."));
});

const getMe = catchAsync(async (req, res, next) => {
  const user = await userService.findUser("id", req.user._id);

  res.status(200).json(new ApiResponse(user, "Avatar successfully updated."));
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.getAllUsers(req.query);

  res.status(200).json(new ApiResponse(users, "Avatar successfully updated."));
});

const getAUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const user = await userService.findUser("id", userId);

  if (!user) return next(new AppError("No user found with this id.", 400));

  res.status(200).json(new ApiResponse(user, "get user successfully"));
});

const deleteMe = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const password = req.body.password;

  const users = await userService.deleteMe(userId, password);

  res
    .status(200)
    .json(new ApiResponse(users, "Your account successfully deleted."));
});

const deleteAUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const users = await userService.deleteAUser(userId);

  res.status(200).json(new ApiResponse(users, "User successfully deleted."));
});
const assignRole = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const role = req.body.role;

  const users = await userService.assignRole(userId, role);

  res
    .status(200)
    .json(new ApiResponse(users, "User role successfully updated."));
});

module.exports = {
  updateMyAvatar,
  updateMe,
  getMe,
  getAUser,
  getAllUsers,
  deleteMe,
  deleteAUser,
  assignRole,
};
