import { imageUploadUtil } from "../../Cloudinary/cloudinary.js";
import { Product } from "../../models/products.model.js";

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });

    const result = await imageUploadUtil(req.file);
    return res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

// add a product
const addProduct = async (req, res) => {
  try {
    const colorArray = req.body.colors;
    req.body.colors = colorArray.replaceAll(" ", "").split(",");
    const sizeArray = req.body.sizes;
    req.body.sizes = sizeArray.replaceAll(" ", "").split(",");

    const newProduct = new Product(req.body);
    await newProduct.save();

    return res.json({
      success: true,
      data: newProduct,
      message: "product added !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

// fetch all products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

// edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let {
      title,
      description,
      image,
      category,
      brand,
      salePrice,
      price,
      totalStock,
      colors,
      sizes,
    } = req.body;

    const colorArray = colors.toString().replace(/ /g, "");
    colors = colorArray.split(",");
    const sizeArray = sizes.toString().replace(/ /g, "");
    sizes = sizeArray.split(",");

    const getProduct = await Product.findById(id);
    if (!getProduct)
      return res
        .status(404)
        .json({ success: false, message: "product not found" });

    getProduct.title = title || getProduct.title;
    getProduct.description = description || getProduct.description;
    getProduct.category = category || getProduct.category;
    getProduct.brand = brand || getProduct.brand;
    getProduct.price = price || getProduct.price;
    getProduct.colors = colors || getProduct.colors;
    getProduct.sizes = sizes || getProduct.sizes;
    getProduct.salePrice = salePrice || getProduct.salePrice;
    getProduct.totalStock = totalStock || getProduct.totalStock;
    getProduct.image = image || getProduct.image;

    await getProduct.save();
    return res.json({
      success: true,
      data: getProduct,
      message: "product edited !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await Product.findByIdAndDelete(id);
    if (!getProduct)
      return res
        .status(404)
        .json({ success: false, message: "product not found" });

    return res.json({
      success: true,
      data: getProduct,
      message: "product deleted !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

export {
  handleImageUpload,
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
};
