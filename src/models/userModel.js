const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
			select: false,
			required: [true, 'Please provide password.'],
			validate: {
				validator: (value) =>
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}/.test(value),
				message:
					'Password must be at least 8 characters with at least 1 lowercase, 1 uppercase, 1 digit, and 1 special character.',
			},
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
		passwordResetTokenExpire: {
			type: Date,
		},
		emailVerificationToken: {
			type: String,
		},
		emailVerificationExpire: {
			type: Date,
		},
	},
	{ timestamps: true },
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;

	next();
});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
	const user = await this.findOne({ email, _id: { $ne: excludeUserId } });

	return !!user;
};

userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.passwordChangeAfter = function (jwtTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10,
		);
		return jwtTimestamp < changedTimestamp;
	}
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(64).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
