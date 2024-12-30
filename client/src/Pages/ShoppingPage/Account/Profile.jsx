import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="min-h-52 p-10">
      <div className="border md:w-[50%] space-y-3 p-8">
        <h1 className="font-semibold text-2xl md:text-3xl capitalize text-gray-800">
          Name : <span className="font-bold">{user?.fullName}</span>
        </h1>
        <h1 className="font-semibold text-xl md:text-2xl capitalize text-gray-800">
          Gmail : <span className="font-bold">{user?.email}</span>
        </h1>
      </div>
    </div>
  );
};

export default Profile;
