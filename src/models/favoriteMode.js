const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		products: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
		],
	},
	{ timestamps: true },
);

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
