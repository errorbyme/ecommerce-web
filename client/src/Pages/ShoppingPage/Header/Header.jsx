import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SpaIcon from "@mui/icons-material/Spa";
import MenuIcon from "@mui/icons-material/Menu";
import Navs from "./Navs";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import SideDrawer from "./SideDrawer";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Menuu from "./Menu";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../../Store/cart-slice";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.userCarts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) dispatch(getCartItems(user?.id));
  }, [dispatch]);

  return (
    <header className="bg-white sticky top-0" style={{ zIndex: 1201 }}>
      <nav
        aria-label="Global"
        className="mx-auto h-16 flex max-w-7xl items-center justify-between px-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/shop" className="-m-1.5 p-1.5 flex">
            <span className="sr-only">Your Company</span>
            <SpaIcon fontSize="large" className="text-blue-950" />
            <span className="font-extrabold"></span>
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Navs />
        </div>
        <div className="flex lg:flex-1 lg:justify-end gap-1 items-center">
          {isAuthenticated ? (
            <>
              <Menuu user={user} />
              <IconButton LinkComponent={Link} to="/shop/cart">
                <Badge badgeContent={cartItems?.items?.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </>
          ) : (
            <Button
              size="small"
              LinkComponent={Link}
              to="/auth/login"
              variant="contained"
            >
              Sign In
            </Button>
          )}
          <IconButton LinkComponent={Link} to={"/shop/search"}>
            <SearchIcon />
          </IconButton>
          <div className="lg:hidden flex items-center">
            <IconButton className="rotate-180" onClick={() => setOpen(!open)}>
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </div>
      </nav>
      <SideDrawer open={open} setOpen={setOpen} />
    </header>
  );
}
