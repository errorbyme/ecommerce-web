import express from "express";
import {
  addReview,
  deleteReview,
  editReview,
  getAllReviews,
} from "../controller/review.controller.js";

const router = express.Router();

router.post("/add", addReview);
router.get("/get/:productId", getAllReviews);
router.put("/update", editReview);
router.delete("/:reviewId", deleteReview);

export default router;
