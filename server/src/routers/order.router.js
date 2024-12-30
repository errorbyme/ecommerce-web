import express from "express";
import {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  verifyPayment,
} from "../controller/order.controller.js";

const router = express.Router();

router.post("/payment", createOrder);
router.post("/verify", verifyPayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

export default router;
