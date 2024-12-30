import { SwipeableDrawer } from "@mui/material";
import AdminSideBar from "./AdminSideBar";

export default function SideDrawer({ open, setOpen }) {
  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)} // Add this line
        onClose={() => setOpen(false)}
        className="lg:hidden"
        PaperProps={{
          sx: {
            zIndex: 1200, // Adjust this value as needed
          },
        }}
      >
        <AdminSideBar open={open} setOpen={setOpen} />
      </SwipeableDrawer>
    </div>
  );
}
