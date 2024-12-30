import Navs from "./Navs";
import { SwipeableDrawer } from "@mui/material";

export default function SideDrawer({ open, setOpen }) {
  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        className="lg:hidden"
        PaperProps={{
          sx: {
            zIndex: 1200,
          },
        }}
      >
        <div className="w-56 pt-20">
          <div className="flex flex-col items-center p-2 gap-4">
            <Navs />
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
