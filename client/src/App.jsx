import React, { useEffect } from "react";
import "./index.css";
import { Outlet } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { checkAuth } from "./Store/auth-slice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="flex flex-col relative">
      <ToastContainer closeOnClick autoClose={3000} position="bottom-right" />
      <Outlet />
    </div>
  );
};

export default App;
