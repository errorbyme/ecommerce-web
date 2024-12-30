import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";

const ErrorPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInternet = searchParams.get("noInternet") === "true";
  const navigate = useNavigate();

  return (
    <div className="p-10 flex justify-center">
      {isInternet ? (
        <div>
          <h1 className=" font-bold text-xl sm:text-3xl">
            Please connect to Internet !!
          </h1>
          <Button
            size="small"
            variant="contained"
            onClick={() => navigate("/shop")}
          >
            Check Again
          </Button>
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-xl sm:text-3xl">Error Occur !!</h1>
          <p>Please check your URL</p>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
