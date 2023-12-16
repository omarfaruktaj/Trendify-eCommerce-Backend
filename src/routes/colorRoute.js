const router = require("express").Router();
const { UserRolesEnum } = require("../constants");
const validatePermission = require("../middlewares/validatePermission");
const { colorService } = require("../services");

router.use(validatePermission(UserRolesEnum.ADMIN));
router.route("/").get(colorService.getAllColors).post(colorService.createColor);
router.patch("/:colorId", colorService.updateAColor);

module.exports = router;
