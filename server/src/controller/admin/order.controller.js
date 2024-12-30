import { Cart } from "../../models/cart.model.js";
import { Order } from "../../models/order.model.js";
import { User } from "../../models/user.model.js";

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
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

const getOrderDetailsForAdmin = async (req, res) => {
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

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found !!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    return res.json({
      success: true,
      message: "order status updated successfully !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating order",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "users not found !!",
      });
    }
    return res.json({
      success: true,
      data: users.length,
      message: "all users got successfully !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating order",
    });
  }
};

export {
  getAllOrders,
  updateOrderStatus,
  getOrderDetailsForAdmin,
  getAllUsers,
};
