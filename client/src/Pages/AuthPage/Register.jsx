import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Store/auth-slice";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData = Object.fromEntries(data);

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate("/auth/login");
      } else {
        toast.warn(data?.payload?.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=" rounded-lg max-w-80 w-full p-2 space-y-3">
        <h1 className="text-4xl font-extrabold">Register</h1>
        <p className="text-end">
          <Link to="/auth/login" className="text-blue-950 ">
            Already have an Account?
          </Link>
        </p>
        <input
          className="w-full p-2 outline-none bg-gray-200"
          autoFocus
          type="text"
          placeholder="Your Name"
          required
          name="fullName"
        />
        <input
          className="w-full p-2 outline-none bg-gray-200"
          type="email"
          placeholder="Gmail"
          required
          name="email"
        />
        <input
          className="w-full p-2 outline-none bg-gray-200"
          type="text"
          placeholder="Password"
          required
          name="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="small"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={23} /> : "Register"}
        </Button>
      </div>
    </form>
  );
};

export default Register;
