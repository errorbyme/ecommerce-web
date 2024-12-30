import { Product } from "../models/products.model.js";

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.json({
        success: false,
        message: "key is required !!",
      });
    }
    const regEx = new RegExp(keyword, "i");
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };
    const searchResults = await Product.find(createSearchQuery);
    return res.json({
      success: true,
      data: searchResults,
      message: "search results fetched !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating order",
    });
  }
};

export { searchProducts };
