import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    // mobile: { type: String, required: true },
    // address: [{ type: mongoose.Schema.Types.ObjectId, ref: "addresses" }],
    // paymentInfo: { type: mongoose.Schema.Types.ObjectId, ref: "payment_info" },
    // ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "ratings" }],
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
