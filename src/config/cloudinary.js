const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

const destroyFile = (publicId) =>
	cloudinary.v2.destroy(publicId, (err, des) => des);

const uploadFile = (file, folderName, width) =>
	cloudinary.v2.uploader.upload(file, {
		width,
		folder: `Trendify/${folderName}`,
		crop: 'fit',
		format: 'webp',
	});

module.exports = {
	destroyFile,
	uploadFile,
};
