import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

export const Review = mongoose.model("reviews", reviewSchema);
