const router = require("express").Router();
const { UserRolesEnum } = require("../constants");
const protect = require("../middlewares/protect");
const validatePermission = require("../middlewares/validatePermission");
const { categoryController } = require("../controllers");

router.get("/", categoryController.getCategories);
router.get("/:categoryId", categoryController.getCategory);

router.use(protect, validatePermission(UserRolesEnum.ADMIN));
router.post("/", categoryController.createCategory);
router
  .route("/:categoryId")
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
