import { Cart } from "../models/cart.model.js";
import { Product } from "../models/products.model.js";

const addToCart = async (req, res) => {
  try {
    let { userId, productId, quantity, color, size } = req.body;
    quantity = Number(quantity);

    if (!userId || !productId || quantity <= 0)
      return res.json({
        success: false,
        message: "invalid data provided !!",
      });

    const product = await Product.findById(productId);
    if (!product)
      return res.json({
        success: false,
        message: "product not found !!",
      });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const getCurrentPoductIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (getCurrentPoductIndex === -1) {
      cart.items.push({ productId, quantity, color, size });
    } else {
      cart.items[getCurrentPoductIndex].quantity += quantity;
    }

    await cart.save();
    return res.json({
      success: true,
      data: { ...cart._doc },
      message: "added to cart !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res.json({
        success: false,
        message: "userId is mendetory!!",
      });

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price brand salePrice color size",
    });

    if (!cart)
      return res.json({
        success: false,
        data: null,
        message: "cart not found!!",
      });

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      brand: item.productId.brand,
      salePrice: item.productId.salePrice,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    }));

    return res.json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
      message: "cart items fetched !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};
const updateCartItem = async (req, res) => {
  try {
    let { userId, productId, quantity, color, size } = req.body;

    quantity = Number(quantity);

    if (!userId || !productId || quantity <= 0)
      return res.json({
        success: false,
        message: "invalid data provided !!",
      });

    let cart = await Cart.findOne({ userId });
    if (!cart)
      return res.json({
        success: false,
        message: "cart not found!!",
      });

    const findCurrentProductIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );
    if (findCurrentProductIndex === -1)
      return res.json({
        success: false,
        message: "cart item not found!!",
      });
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title brand price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      brand: item.productId ? item.productId.brand : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    }));

    return res.json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
      message: "cart updated !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId, color, size } = req.params;

    if (!userId || !productId)
      return res.json({
        success: false,
        message: "invalid data provided !!",
      });

    let cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title brand price salePrice",
    });
    if (!cart)
      return res.json({
        success: false,
        message: "cart not found!!",
      });

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId._id.toString() === productId &&
          item.color === color &&
          item.size === size
        )
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title brand price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      brand: item.productId ? item.productId.brand : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    }));

    return res.json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
      message: "cart deleted !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

export { addToCart, deleteCartItem, updateCartItem, getCartItems };
