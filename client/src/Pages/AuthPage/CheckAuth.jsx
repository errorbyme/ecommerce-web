import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleCheck = async () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleCheck);
    window.addEventListener("offline", handleCheck);
  }, []);

  if (!isOnline) {
    return <Navigate to="/error-page?noInternet=true" />;
  }

  if (!isAuthenticated && location.pathname.includes("/admin")) {
    return <Navigate to="/auth/login" />;
  }

  if (
    !isAuthenticated &&
    (location.pathname.includes("/shop/cart") ||
      location.pathname.includes("/shop/checkout") ||
      location.pathname.includes("/shop/account") ||
      location.pathname.includes("/shop/account") ||
      location.pathname.includes("/shop/cart"))
  ) {
    return <Navigate to="/shop" />;
  }

  if (isAuthenticated && location.pathname.includes("/auth")) {
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    else return <Navigate to="/shop" />;
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
