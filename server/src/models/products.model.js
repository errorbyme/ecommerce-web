import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    brand: { type: String },
    colors: { type: [] },
    sizes: { type: [] },
    salePrice: { type: Number },
    price: { type: Number },
    totalStock: { type: Number },
  },
  { timestamps: true }
);

export const Product = mongoose.model("products", categorySchema);
