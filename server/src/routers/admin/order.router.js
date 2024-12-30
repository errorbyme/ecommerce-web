import express from "express";
import {
  getAllOrders,
  getAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../controller/admin/order.controller.js";

const router = express.Router();

router.get("/get", getAllOrders);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);
router.get("/getusers", getAllUsers);

export default router;
