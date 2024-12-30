import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, min: 1 },
        color: { type: String },
        size: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("cart", cartSchema);
