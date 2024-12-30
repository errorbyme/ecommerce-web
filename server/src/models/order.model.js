import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    cartId: String,
    cartItems: [
      {
        productId: String,
        title: String,
        image: String,
        price: String,
        salePrice: String,
        quantity: Number,
        color: String,
        size: String,
      },
    ],
    addressInfo: {
      firstName: String,
      lastName: String,
      addressId: String,
      addressId: String,
      address: String,
      state: String,
      city: String,
      pincode: String,
      phone: String,
      notes: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
  },
  { timestamps: true }
);

export const Order = mongoose.model("orders", orderSchema);
