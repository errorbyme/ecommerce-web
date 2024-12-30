import React from "react";
import AddressCard from "./AddressCard";
import CartItem from "../Cart/CartItem";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";

const Orders = ({ address }) => {
  return (
    <div>
      <Cart isCheckout={true} address={address} />
    </div>
  );
};

export default Orders;
