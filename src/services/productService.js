const { Product } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures");
const { uploadFile, destroyFile } = require("../config/cloudinary");
const dataUri = require("../utils/datauri");

const getAllProducts = (query) => {
  const features = new ApiFeatures(Product.find({}), query)
    .search()
    .filter()
    .limitFields()
    .sort()
    .paginate();
  return features.query;
};

const getAProduct = (key, value) => {
  if (key === "id") {
    return Product.findById(value).populate("reviews");
  }

  return Product.findOne({ [key]: value }).populate("reviews");
};

const createProduct = catchAsync(
  async ({
    name,
    slug,
    description,
    images,
    colors,
    sizes,
    price,
    priceDiscount,
    category,
    quantity,
  }) => {
    const imagesPromises = images.map((image) =>
      uploadFile(dataUri(image).content, "Products", 600)
    );

    const imagesResult = await Promise.all(imagesPromises);

    const imageUrls = imagesResult.map((image) => ({
      public_id: image.public_id,
      url: image.secure_url,
    }));

    let priceAfterDiscount = Number(price);

    if (priceDiscount !== 0) {
      priceAfterDiscount =
        Number(price) - (Number(price) / 100) * Number(priceDiscount);
    }

    return Product.create({
      name,
      slug,
      description,
      colors,
      sizes,
      price,
      priceDiscount,
      priceAfterDiscount,
      category,
      quantity,
      images: imageUrls,
    });
  }
);

const updateProduct = catchAsync(
  async (
    productId,
    {
      name,
      slug,
      description,
      colors,
      sizes,
      price,
      priceDiscount,
      category,
      quantity,
      sold,
      isOutOfStock,
      images,
    }
  ) => {
    const product = await Product.findById(productId);

    if (!product) throw new AppError("No product found with this id", 400);

    let priceAfterDiscount = Number(price);

    if (priceDiscount !== 0) {
      priceAfterDiscount =
        Number(price) - (Number(price) / 100) * Number(priceDiscount);
    }
    let imageUrls;
    if (images) {
      const productImagesId = product.images.reduce((acc, curr) => {
        acc.push(curr.public_id);
        return acc;
      }, []);

      productImagesId.forEach((image) => destroyFile(image));

      const imagePromises = images.map((image) =>
        uploadFile(image, "Products", 600)
      );

      const imagesResult = await Promise.resolve(imagePromises);

      imageUrls = imagesResult.map((image) => ({
        public_id: image.public_id,
        url: image.secure_url,
      }));
    }

    return Product.findByIdAndUpdate(
      productId,
      {
        name,
        slug,
        description,
        colors,
        sizes,
        price,
        isOutOfStock,
        category,
        priceAfterDiscount,
        images: imageUrls,
        priceDiscount: Number(priceDiscount),
        quantity: Number(quantity),
        sold: Number(sold),
      },
      { new: true, runValidators: true }
    );
  }
);

const updateProductInternal = (productId, fields) => {
  return Product.findByIdAndUpdate(productId, { ...fields });
};

const updateProductImages = catchAsync(async (productId, images) => {
  const product = await Product.findById(productId);

  if (!product) throw new AppError("No product found with this id", 400);

  const productImagesId = product.images.reduce((acc, curr) => {
    acc.push(curr.public_id);
    return acc;
  }, []);

  productImagesId.forEach((image) => destroyFile(image));

  const imagePromises = images.map((image) =>
    uploadFile(image, "Products", 600)
  );

  const imagesResult = await Promise.resolve(imagePromises);

  const imageUrls = imagesResult.map((image) => ({
    public_id: image.public_id,
    url: image.secure_url,
  }));

  return Product.findByIdAndUpdate(
    { images: imageUrls },
    { new: true, runValidators: true }
  );
});

const deleteProduct = catchAsync((productId) => {
  return Product.findByIdAndDelete(productId, { new: true });
});

module.exports = {
  createProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  updateProductImages,
  deleteProduct,
  updateProductInternal,
};
