import { Review } from "../models/review.model.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/products.model.js";

const addReview = async (req, res) => {
  try {
    const { userId, productId, review, rating } = req.body;
    if (!userId || !productId || !review || !rating)
      return res.json({
        success: false,
        message: "invalid data provided !!",
      });

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order)
      return res.json({
        success: false,
        message: "Purchase this product to review it !!",
      });

    const checkExistingReview = await Review.findOne({ productId, userId });
    if (checkExistingReview) {
      return res.json({
        success: false,
        message: "already reviewed this product !!",
      });
    }
    const newReview = new Review(req.body);
    await newReview.save();
    return res.json({
      success: true,
      message: "review added !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId)
      return res.json({
        success: false,
        message: "invalid data provided !!",
      });
    const getReviews = await Review.find({ productId })
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "fullName email",
      });

    return res.json({
      success: true,
      data: getReviews,
      message: "reviews fetched",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (!reviewId)
      return res.json({
        success: false,
        message: "invalid data provided !!",
      });

    const getReview = await Review.findByIdAndDelete(reviewId);

    if (!getReview)
      return res.status(404).json({ success: false, message: "review found" });

    return res.json({
      success: true,
      message: "Review deleted !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

const editReview = async (req, res) => {
  try {
    const { reviewId, review, rating } = req.body;

    if (!reviewId || !userId || !productId || !review || !rating)
      return res.json({
        success: false,
        message: "invalid data provided !!",
      });

    const getReview = await Review.findById(review);
    if (!getReview)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    getReview.review = review || getReview.review;
    getReview.rating = rating || getReview.rating;

    await getReview.save();
    return res.json({
      success: true,
      message: "review edited !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

export { addReview, getAllReviews, deleteReview, editReview };
