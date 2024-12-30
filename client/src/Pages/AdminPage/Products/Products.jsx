import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../Store/admin/product-slice";
import AddIcon from "@mui/icons-material/Add";

const initialData = {
  title: "",
  description: "",
  image: "",
  category: "women",
  brand: "nike",
  salePrice: "",
  price: "",
  colors: "",
  sizes: "",
  totalStock: "",
};

const Products = () => {
  const [productSidebar, setProductSidebar] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const [editedId, setEditedId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (editedId) setIsEditMode(true);
    else setIsEditMode(false);
  }, [editedId]);

  return (
    <div className="w-full">
      <div className="mb-5 flex justify-end">
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => setProductSidebar(true)}
        >
          Add New Product <AddIcon className="ml-2" fontSize="small" />
        </Button>
      </div>
      <AddProduct
        open={productSidebar}
        setOpen={setProductSidebar}
        formData={formData}
        setFormData={setFormData}
        initialData={initialData}
        isEditMode={isEditMode}
        setEditedId={setEditedId}
        editedId={editedId}
      />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {productList &&
          productList.length > 0 &&
          productList.map((product, i) => (
            <Card
              product={product}
              setProductSidebar={setProductSidebar}
              setEditedId={setEditedId}
              setFormData={setFormData}
              key={i}
            />
          ))}
      </div>
    </div>
  );
};

export default Products;
