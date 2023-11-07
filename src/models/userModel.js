const mongoose = require('mongoose');
const validator = require('validator');
const {
	AvailableUserRoles,
	UserRolesEnum,
	AvailableLoginTypes,
	UserLoginType,
} = require('../constants');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Please provide your name.'],
			minLength: 3,
			maxLength: 30,
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: [true, 'Please provide your email.'],
			validate: {
				validator: (value) => validator.isEmail(value),
				message: 'Invalid email! Please provide a valid email.',
			},
		},
		password: {
			type: String,
			trim: true,
			required: [true, 'Please provide password.'],
			validate: {
				validator: (value) =>
					/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/.test(
						value,
					),
			},
			message:
				'Password must have 2 uppercase, 1 special, 2 digits, 3 lowercase, and be at least 8 characters long.',
		},
		avatar: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
		role: {
			type: String,
			enum: AvailableUserRoles,
			default: UserRolesEnum.USER,
		},
		loginType: {
			type: String,
			enum: AvailableLoginTypes,
			default: UserLoginType.EMAIL_PASSWORD,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		refreshToken: [
			{
				type: String,
			},
		],
		passwordChangedAt: {
			type: Date,
		},
		passwordResetToken: {
			type: String,
		},
		passWordResetTokenExpire: {
			type: Date,
		},
		emailVerificationToken: {
			type: String,
		},
		emailVerificationTokenExpire: {
			type: Date,
		},
	},
	{ timestamps: true },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
