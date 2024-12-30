import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteProduct,
  getAllProducts,
} from "../../../Store/admin/product-slice";

const Card = ({ product, setProductSidebar, setEditedId, setFormData }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete?`);
    if (!isConfirmed) return;

    dispatch(deleteProduct(id)).then((data) => {
      if (data?.payload.success) {
        dispatch(getAllProducts());
        toast.success(data?.payload.message);
      } else {
        toast.warn(data?.payload.message);
      }
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="h-[300px] w-full object-cover rounded-t-lg"
        />
      </div>
      <div className="space-y-3 mt-2">
        <h2 className="text-md font-bold mb-2">{product?.title}</h2>
        <div className="flex justify-between items-center">
          <span
            className={`${
              product?.salePrice > 0 && "line-through"
            } text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          {product.salePrice > 0 && (
            <span className="text-md font-semibold">${product?.salePrice}</span>
          )}
        </div>
        <div className="flex justify-between items-center gap-2">
          <Button
            variant="contained"
            className="w-full"
            color="secondary"
            onClick={() => {
              setFormData(product);
              setEditedId(product?._id);
              setProductSidebar(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            className="w-full"
            color="error"
            onClick={() => handleDelete(product?._id)}
          >
            delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
