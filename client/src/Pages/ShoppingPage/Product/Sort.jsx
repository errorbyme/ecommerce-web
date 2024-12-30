import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { sortOptions } from "./filterOptions.js";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { FormControlLabel, RadioGroup } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function Sort({ sort, setSort }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = async (value) => {
    setSort(value);
  };

  return (
    <div className="mb-4 flex justify-between p-4">
      <h2 className="text-2xl font-extrabold">New Arrivals</h2>
      <Button
        className="text-gray-500"
        variant="contained"
        onClick={handleClick}
        size="small"
      >
        <SwapVertIcon />
        Sort
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {sortOptions.map((option) => (
          <MenuItem
            id={option.id}
            key={option.id}
            onClick={() => handleSort(option.id)}
          >
            {sort === option.id && (
              <FiberManualRecordIcon fontSize="xs" className="mr-2" />
            )}
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
