import { Button } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Return = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const navigate = useNavigate();
  return (
    <div className="min-h-screen p-10">
      {success ? (
        <div>
          <h1 className="text-xl font-bold">Payment Successfull..</h1>
          <Button
            size="small"
            onClick={() => navigate("/shop/account/order")}
            variant="contained"
          >
            See Order <ArrowRightAltIcon />
          </Button>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-bold">
            Payment Error occurred Or Aborted..
          </h1>
          <Button
            size="small"
            onClick={() => navigate("/shop/cart")}
            variant="contained"
          >
            <KeyboardBackspaceIcon />
            Go Back To Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default Return;
