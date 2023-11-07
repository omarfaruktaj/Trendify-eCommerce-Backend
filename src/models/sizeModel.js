const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema(
	{
		size: {
			type: String,
			trim: true,
			required: [true, 'Please provide a size.'],
		},
	},
	{ timestamps: true },
);

const Size = mongoose.model('Size', sizeSchema);
module.exports = Size;
