import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    userId: { type: String },
    contact: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Address = mongoose.model("addresses", addressSchema);
