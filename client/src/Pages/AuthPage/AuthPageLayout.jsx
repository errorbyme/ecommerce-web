import React from "react";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black text-white w-1/2 px-12">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Welcome to Ecommece shopping
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
