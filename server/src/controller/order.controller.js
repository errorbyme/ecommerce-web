import crypto from "crypto";
import { Cashfree } from "cashfree-pg";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/products.model.js";

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// Function to generate a unique order ID
const generateOrderId = () => {
  const unique_id = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256");
  hash.update(unique_id);
  const orderId = hash.digest("hex");
  return orderId.slice(0, 50); // Ensure order_id is within 50 characters
};

// Function to create an order using Cashfree API
const createOrder = async (req, res) => {
  try {
    // Generate order ID
    const orderId = generateOrderId();

    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // Order details

    const orderDetails = {
      order_id: orderId, // Unique order ID
      order_amount: Number(totalAmount), // Amount to be charged
      order_currency: "INR", // Currency
      order_note: "Test Order from API",
      customer_details: {
        customer_id: userId, // Unique user ID
        customer_email: "user@example.com", // User email
        customer_phone: "1234567890", // User phone
      },
      order_meta: {
        return_url: "http://localhost:5173/shop/return-page",
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", orderDetails);

    const newlyCreatedOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    });

    await newlyCreatedOrder.save();

    return res.json({
      success: true,
      data: response.data,
      orderId: newlyCreatedOrder._id,
      message: "Order added !!",
    });
  } catch (error) {
    console.log(error?.message);
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating order",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { orderPaymentId, orderId } = req.body;
    const response = await Cashfree.PGFetchOrder("2023-08-01", orderPaymentId);

    const order = await Order.findById(orderId);
    if (!order)
      return res.json({
        success: false,
        message: "Order not found !!",
      });

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.json({
          success: false,
          message: `Not enough stocks for ${product.title} !!`,
        });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    return res.json({
      success: true,
      message: "payed successfully !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating order",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "orders not found !!",
      });
    }
    return res.json({
      success: true,
      data: orders,
      message: "orders fetched by user successfully !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating order",
    });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found !!",
      });
    }
    return res.json({
      success: true,
      data: order,
      message: "order details fetched successfully !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating order",
    });
  }
};
export { createOrder, verifyPayment, getAllOrdersByUser, getOrderDetails };
