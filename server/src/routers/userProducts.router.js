import express from "express";
import {
  getFilteredProducts,
  getProductDetails,
  getProductsByCategory,
} from "../controller/userProducts.controller.js";

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/getbycategory/:category", getProductsByCategory);
router.get("/get/:id", getProductDetails);

export default router;
