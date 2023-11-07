const UserRolesEnum = {
	ADMIN: 'ADMIN',
	USER: 'USER',
};

const AvailableUserRoles = Object.values(UserRolesEnum);

const UserLoginType = {
	EMAIL_PASSWORD: 'EMAIL_PASSWORD',
	GOOGLE: 'GOOGLE',
};

const AvailableLoginTypes = Object.values(UserLoginType);

module.exports = {
	UserRolesEnum,
	AvailableUserRoles,
	UserLoginType,
	AvailableLoginTypes,
};
