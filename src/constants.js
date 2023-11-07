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

const OrderStatusEnum = {
	NotProcessed: 'Not Processed',
	Processing: 'Processing',
	Shipped: 'Shipped',
	Delivered: 'Delivered',
	Cancelled: 'Cancelled',
};
const AvailableOrderStatuses = Object.values(OrderStatusEnum);
module.exports = {
	UserRolesEnum,
	AvailableUserRoles,
	UserLoginType,
	AvailableLoginTypes,
	OrderStatusEnum,
	AvailableOrderStatuses,
};
