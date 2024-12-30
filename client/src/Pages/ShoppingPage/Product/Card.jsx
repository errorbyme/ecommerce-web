import React from "react";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";

const Card = ({ product, i }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/shop/product/${product?._id}`)}
      className={`${
        i % 2 === 0 ? "border-r sm:border-none border-gray-300" : "border-none"
      } cursor-pointer overflow-hidden w-[100%] h-auto relative`}
    >
      {product?.salePrice > 0 && (
        <Badge
          color="error"
          badgeContent="Sale"
          sx={{ position: "absolute", left: "85%", top: "15px", zIndex: "100" }}
        ></Badge>
      )}
      <div className="h-[10rem] sm:h-[18rem] w-full">
        <img
          className="object-cover object-center w-full h-full"
          src={product?.image}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="p-2 space-y-2">
        <h4 className="mt-2 capitalize font-bold text-xs sm:text-sm text-gray-800">
          {product?.title}
        </h4>
        <div className="flex justify-between opacity-60 text-xs sm:text-sm capitalize">
          <span>{product?.category}</span>
          <span>{product?.brand !== "none" && product?.brand}</span>
        </div>
        <div className="flex justify-between text-xs sm:text-sm text-gray-600">
          <b className={`${product?.salePrice > 0 && "line-through"}`}>
            ₹{product?.price}
          </b>
          {product?.salePrice > 0 && (
            <span className="font-semibold">₹{product?.salePrice}</span>
          )}
        </div>
        <div className="text-[10px] text-gray-500 sm:text-xs font-bold">
          {product?.totalStock === 0 ? (
            <span className="text-red-800">Out of stocks</span>
          ) : (
            product?.totalStock <= 10 && (
              <span className="text-orange-600">
                Only {product?.totalStock} left
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
