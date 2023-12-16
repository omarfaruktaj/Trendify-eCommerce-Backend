const { categoryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/apiResponse");

const getCategories = catchAsync(async (req, res, next) => {
  const categories = await categoryService.getCategories();

  res
    .status(200)
    .json(new ApiResponse(categories, "All categories get successfully."));
});

const createCategory = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { name, description, image } = req.body;

  const category = await categoryService.createCategory({
    name,
    description,
    image,
  });
  console.log(category);

  res
    .status(201)
    .json(new ApiResponse(category, "Category created successfully."));
});
const getCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const category = await categoryService.getCategory(categoryId);

  res
    .status(200)
    .json(new ApiResponse(category, "Category find successfully."));
});

const updateCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const { name, description, image } = req.body;
  const color = await categoryService.updateAColor(categoryId, {
    name,
    description,
    image,
  });

  res
    .status(200)
    .json(new ApiResponse({ color }, "Color successfully updated."));
});

const deleteCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const category = await categoryService.deleteCategory(categoryId);

  res
    .status(200)
    .json(new ApiResponse(category, "Category successfully deleted."));
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
