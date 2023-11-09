const AppError = require('../utils/appError');

const validatePermission = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role))
			return next(
				new AppError(
					`Role: ${req.user.role} is not allowed to access this resource.`,
				),
			);
		return next();
	};
};
module.exports = validatePermission;
