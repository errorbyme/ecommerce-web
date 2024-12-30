import express from "express";
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controller/cart.controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCartItems);
router.put("/update-cart", updateCartItem);
router.delete("/:userId/:productId/:color/:size", deleteCartItem);

export default router;
