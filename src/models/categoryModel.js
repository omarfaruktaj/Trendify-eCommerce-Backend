const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			minLength: 10,
			maxLength: 120,
			required: [true, 'Please provide a name.'],
		},
		description: {
			type: String,
			minLength: 20,
			maxLength: 500,
			trim: true,
			required: [true, 'Please provide a description.'],
		},
		image: {
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	},
	{ timestamps: true },
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
