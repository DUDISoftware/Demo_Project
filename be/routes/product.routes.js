const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { uploadImage } = require("../middleware/cloudinary.middleware");
const { verifyToken } = require("../middleware/auth.middleware");

const uploadFields = uploadImage.fields([
  { name: "image", maxCount: 1 },
  { name: "sub_images", maxCount: 5 },
]);

router.post("/", verifyToken, uploadFields, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", verifyToken, uploadFields, productController.updateProduct);
router.delete("/:id", verifyToken, productController.deleteProduct);

module.exports = router;
