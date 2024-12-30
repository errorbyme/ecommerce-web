import { Product } from "../models/products.model.js";

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const getproducts = await Product.find({ category }).limit(5);

    return res.json({
      success: true,
      data: { products: getproducts, category },
      message: "Products fetched by category !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};
const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length > 0) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const getproducts = await Product.find(filters).sort(sort);

    return res.json({
      success: true,
      data: getproducts,
      message: "Products fetched by category !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const getproduct = await Product.findById(id);

    if (!getproduct)
      return res.json({
        success: false,
        message: "Product not found !!",
      });

    return res.json({
      success: true,
      data: getproduct,
      message: "Product fetched !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

export { getFilteredProducts, getProductsByCategory, getProductDetails };
