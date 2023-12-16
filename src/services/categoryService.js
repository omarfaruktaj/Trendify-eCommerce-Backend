const { uploadFile, destroyFile } = require("../config/cloudinary");
const { Category } = require("../models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createCategory = catchAsync(async ({ name, description, image }) => {
  if (!name || !description || !image)
    throw new AppError("Name,description and image are required", 400);

  const uploadedImage = await uploadFile(image, "categories", 1200);

  console.log(uploadedImage);

  return Category.create({
    name,
    description,
    image: {
      public_id: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    },
  });
});

const getCategories = () => {
  return Category.find({});
};

const getCategory = (id) => {
  return Category.findById(id).populate("products");
};

const updateCategory = catchAsync(async (id, { name, description, image }) => {
  const category = await Category.findById(id);

  if (!category) throw new AppError("No category found with this id", 400);

  if (image) {
    destroyFile(category.image);
  }

  const uploadedImage = await uploadFile(image, "categories", 1200);

  return Category.findByIdAndUpdate(id, {
    name,
    description,
    image: {
      public_id: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    },
  });
});

const deleteCategory = (id) => {
  return Category.findByIdAndDelete(id);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
