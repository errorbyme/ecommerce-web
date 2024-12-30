import React from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";

const CartItem = ({ item, handleRemove, handleUpdateQuantity }) => {
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-center"
            src={item?.image}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1 capitalize">
          <p className="text-sm md:text-base font-bold md:font-semibold opacity-90">
            {item?.title}
          </p>
          <p className="opacity-70 text-xs sm:text-sm">
            <span className="font-semibold">{item?.size}</span>,
            <span className="font-semibold"> {item?.color}</span>
          </p>
          <p className="opacity-70 mt-2 text-xs sm:text-sm">
            Brand : {item?.brand}
          </p>
          <div className="flex flex-wrap gap-2 pt-5">
            <p className="opacity-90 font-semibold">
              ₹{item?.salePrice > 0 ? item?.salePrice : item?.price}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton
            disabled={item?.quantity <= 1}
            onClick={() => handleUpdateQuantity(item, "minus")}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>
          <IconButton onClick={() => handleUpdateQuantity(item, "add")}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div className="">
          <Button onClick={() => handleRemove(item)}>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
