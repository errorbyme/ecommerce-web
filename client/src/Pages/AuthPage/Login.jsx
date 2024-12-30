import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Store/auth-slice";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData = Object.fromEntries(data);

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        toast.warn(data?.payload?.message);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className=" rounded-lg max-w-80 w-full p-2 space-y-3">
        <h1 className="text-4xl font-extrabold">Login</h1>
        <p className="text-end">
          <Link to="/auth/register" className="text-blue-950">
            Don't have an Account?
          </Link>
        </p>
        <input
          className="w-full p-2 outline-none bg-gray-200"
          autoFocus
          type="email"
          placeholder="Gmail"
          name="email"
          required
        />
        <input
          className="w-full p-2 outline-none bg-gray-200"
          type="text"
          placeholder="Password"
          name="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="small"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={23} /> : "Log In"}
        </Button>
      </div>
    </form>
  );
};

export default Login;
