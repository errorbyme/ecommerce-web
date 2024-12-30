import { Button, IconButton, SwipeableDrawer } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ImageUpload from "./ImageUpload";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addNewProduct,
  editProduct,
  getAllProducts,
} from "../../../Store/admin/product-slice";
import { toast } from "react-toastify";

export default function AddProduct({
  open,
  setOpen,
  formData,
  setFormData,
  initialData,
  isEditMode,
  setEditedId,
  editedId,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(true);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const isDisabled = !isFormValid();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      isEditMode
        ? editProduct({ id: editedId, formData })
        : addNewProduct(formData)
    ).then((data) => {
      if (data?.payload?.success) {
        setFormData(initialData);
        setOpen(false);
        setImageFile(null);
        setUploadedImgUrl("");
        dispatch(getAllProducts());
        toast.success(data?.payload.message);
      } else {
        toast.warn(data?.payload.message);
      }
    });
  };

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    const response = await axios.post(
      "http://localhost:9999/api/admin/products/upload-image",
      data
    );
    if (response?.data.success) {
      setUploadedImgUrl(response.data.result.url); // Set the uploaded image URL in the state
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  useEffect(() => {
    if (uploadedImgUrl !== "")
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: uploadedImgUrl,
      }));
  }, [uploadedImgUrl]);

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)} // Add this line
        onClose={() => {
          setFormData(initialData);
          setOpen(false);
          setEditedId(null);
        }}
        PaperProps={{
          sx: {
            zIndex: 1200, // Adjust this value as needed
          },
        }}
      >
        <div className="p-4 max-w-sm space-y-4">
          <div className="flex justify-between place-items-center">
            <h1 className="font-bold">
              {isEditMode ? "Update Product" : "Add Product"}
            </h1>
            <IconButton color="secondary" onClick={() => setOpen(false)}>
              <KeyboardDoubleArrowLeftIcon className="rotate-180" />
            </IconButton>
          </div>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageLoadingState={imageLoadingState}
            isEditMode={isEditMode}
          />
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              className="w-full p-2 rounded-sm"
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              autoFocus
            />
            <textarea
              className="w-full p-2 rounded-sm "
              placeholder="Description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={3}
            />
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              className="w-full p-2 rounded-sm capitalize"
            >
              <option value="women">women</option>
              <option value="men">men</option>
              <option value="kids">kids</option>
              <option value="accessories">accessories</option>
              <option value="footwear">footwear</option>
            </select>
            <select
              name="brand"
              value={formData.brand || ""}
              onChange={handleChange}
              className="w-full p-2 rounded-sm capitalize"
            >
              <option value="nike">nike</option>
              <option value="adidas">adidas</option>
              <option value="puma">puma</option>
              <option value="levis">levis</option>
              <option value="zara">zara</option>
              <option value="h&m">h&m</option>
              <option value="none">none</option>
            </select>
            <input
              className="w-full p-2 rounded-sm "
              type="text"
              placeholder="Red,White,blue"
              name="colors"
              value={formData.colors.toString() || ""}
              onChange={handleChange}
            />
            <input
              className="w-full p-2 rounded-sm "
              type="text"
              placeholder="S,M,L,XL"
              name="sizes"
              value={formData.sizes.toString() || ""}
              onChange={handleChange}
            />
            <input
              className="w-full p-2 rounded-sm appearance-none  !important"
              type="number"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
              placeholder="Price"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
            />
            <input
              className="w-full p-2 rounded-sm "
              type="number"
              placeholder="Sale Price"
              name="salePrice"
              value={formData.salePrice || ""}
              onChange={handleChange}
            />
            <input
              className="w-full p-2 rounded-sm "
              type="number"
              placeholder="Total stock"
              name="totalStock"
              value={formData.totalStock || ""}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              disabled={isDisabled}
            >
              {isEditMode ? "Update" : "Add"}
            </Button>
          </form>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
