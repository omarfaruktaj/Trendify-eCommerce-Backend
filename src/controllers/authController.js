const { authService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/apiResponse");
const AppError = require("../utils/appError");
const { sendVerificationEmail } = require("../utils/email");

const sendToken = (req, res, token) => {
  res
    .cookie("accessToken", token.accessToken, {
      expires: new Date(
        Date.now() +
          process.env.ACCESS_TOKEN_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    })
    .cookie("refreshToken", token.refreshToken, {
      expires: new Date(
        Date.now() +
          process.env.REFRESH_TOKEN_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });
};

const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password)
    return next(new AppError("Name, email, and password are required ."));

  const { user, accessToken, refreshToken, verificationToken } =
    await authService.register({
      name,
      email,
      password,
    });

  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/verify-email/${verificationToken}`;

  // send email verification email
  sendVerificationEmail(user.name, user.email, verificationUrl);

  // set token in cookie
  sendToken(req, res, { accessToken, refreshToken });

  res
    .status(201)
    .json(
      new ApiResponse(
        { user, accessToken, refreshToken },
        "User successfully registered.Email verification email sent your email. Please verify your email"
      )
    );
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Email and password are required .", 400));

  const { user, accessToken, refreshToken } = await authService.login({
    email,
    password,
  });

  sendToken(req, res, { accessToken, refreshToken });

  res
    .status(200)
    .json(
      new ApiResponse(
        { user, accessToken, refreshToken },
        "User successfully login."
      )
    );
});
const logout = catchAsync(async (req, res, next) => {
  let token;
  const { refreshToken } = req.body;
  const userId = req.user._id;
  token = refreshToken || req.cookies.refreshToken;

  if (!token) return next(new AppError("Refresh token is required", 400));

  const user = await authService.logout({ userId, token });

  if (!user) {
    return next(new AppError("Invalid refresh token or user not found", 400));
  }

  const options = {
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse({}, "User successfully logout"));
});
const refreshAccessToken = catchAsync(async (req, res, next) => {
  const token = req.body.refreshToken || req.cookies.refreshToken;

  if (!token) return next(new AppError("Unauthorize request", 401));

  const { user, accessToken, refreshToken } =
    await authService.refreshAccessToken(token);

  sendToken(req, res, { accessToken, refreshToken });
  res
    .status(200)
    .json(
      new ApiResponse(
        { user, accessToken, refreshToken },
        "Access token refreshed"
      )
    );
});
const changeCurrentPassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id;

  if (!oldPassword || !newPassword)
    return next(new AppError("oldPassword and newPassword are required", 400));

  await authService.changeCurrentPassword({
    userId,
    oldPassword,
    newPassword,
  });

  res.status(200).json(new ApiResponse({}, "Password successfully changed."));
});
const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new AppError("Email is required", 400));

  await authService.forgotPassword({ email });

  res
    .status(200)
    .json(
      new ApiResponse(
        {},
        "Password reset token sent your email. Please check your email"
      )
    );
});
const resetPassword = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const token = req.params.token;

  if (!password || !token)
    return next(new AppError("Token and password are required", 400));

  const { user, accessToken, refreshToken } = await authService.resetPassword(
    password,
    token
  );

  sendToken(req, res, { accessToken, refreshToken });

  res
    .status(200)
    .json(
      new ApiResponse(
        { user, accessToken, refreshToken },
        "Password successfully reset"
      )
    );
});
const verifyEmail = catchAsync(async (req, res, next) => {
  const token = req.params.token;

  if (!token) return next(new AppError("Invalid request", 400));

  await authService.verifyEmail(token);

  res.status(200).json(new ApiResponse({}, "Email successfully verified."));
});

module.exports = {
  register,
  login,
  logout,
  refreshAccessToken,
  changeCurrentPassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
