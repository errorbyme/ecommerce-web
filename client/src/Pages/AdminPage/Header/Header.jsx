import React from "react";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Store/auth-slice";
import { toast } from "react-toastify";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Header = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        toast.warn(data?.payload?.message);
      }
    });
  };

  return (
    <header className="flex items-center justify-between px-4 py-2">
      <div className="lg:hidden sm:block">
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
      </div>
      <div className="flex flex-1 justify-end md:p-6">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleLogout}
        >
          Sign Out <ExitToAppIcon className="ml-3 text-sm" fontSize="small" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
