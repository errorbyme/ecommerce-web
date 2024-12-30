import express from "express";
import { upload } from "../../Cloudinary/cloudinary.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  handleImageUpload,
} from "../../controller/admin/products.controller.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", getAllProducts);

export default router;
