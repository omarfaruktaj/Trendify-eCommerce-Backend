const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dcggaf4f8",
  api_key: "663438346498595",
  api_secret: "EHx1vrO9nnzPKnOPxG3UyGgVKq0",
});

const destroyFile = (publicId) =>
  cloudinary.v2.destroy(publicId, (err, des) => des);

const uploadFile = (file, folderName, width) =>
  cloudinary.v2.uploader.upload(file, {
    width,
    folder: `Trendify/${folderName}`,
    crop: "fit",
    format: "webp",
  });

module.exports = {
  destroyFile,
  uploadFile,
};
