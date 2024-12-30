import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer flex flex-col bg-slate-100 rounded-lg shadow-lg overflow-hidden w-[15rem] mx-auto"
      onClick={() => navigate(`/shop/product/${product?._id}`)}
    >
      <div className="h-[16rem] w-full">
        <img
          className="object-cover object-center w-full h-full"
          src={product?.image}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold capitalize text-gray-900">{product?.title}</h3>
        <p className="mt-2 text-sm text-gray-500 font-semibold">
          {product?.description.substring(0, 27)}...
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
