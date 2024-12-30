import React, { useEffect, useState } from "react";
import DeliveryAdd from "./DeliveryAdd";
import Orders from "./OrdersSummary";
import { useSelector } from "react-redux";

function Checkout() {
  const [isform, setIsForm] = useState(false);
  const [address, SetAddress] = useState({});
  const { isPaymentLoading } = useSelector((state) => state.userOrder);

  if (isPaymentLoading)
    return (
      <div className="min-h-54 p-10">
        <h1
          className="sm
        :text-2xl text-xl font-bold"
        >
          Payment Processsing...Please wait !!
        </h1>
      </div>
    );

  return (
    <div className="px-4 md:px-10 pt-10">
      <DeliveryAdd
        isform={isform}
        setIsForm={setIsForm}
        SetAddress={SetAddress}
      />
      {isform && <Orders address={address} />}
    </div>
  );
}

export default Checkout;
