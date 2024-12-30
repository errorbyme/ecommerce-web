import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Store/auth-slice/index.js";
import { toast } from "react-toastify";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function Menuu({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        navigate("/shop");
        toast.success(data?.payload?.message);
      } else {
        toast.warn(data?.payload?.message);
      }
    });
  };

  return (
    <>
      <Avatar
        onClick={handleClick}
        className="text-white capitalize cursor-pointer"
        sx={{ width: 35, height: 35, bgcolor: "darkblue" }}
      >
        {user?.email[0]}
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/shop/account/profile")}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate("/shop/account/order")}>
          My Orders
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Logout <ExitToAppIcon fontSize="small" className="ml-3" />
        </MenuItem>
      </Menu>
    </>
  );
}
