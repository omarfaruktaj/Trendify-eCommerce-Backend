const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Please provide name.'],
		},
		colorCode: {
			type: String,
			trim: true,
			required: [true, 'Please provide color code.'],
		},
	},
	{ timestamps: true },
);

const Color = mongoose.model('Color', colorSchema);
module.exports = Color;
