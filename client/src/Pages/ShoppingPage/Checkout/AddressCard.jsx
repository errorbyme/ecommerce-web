import React, { useEffect } from "react";
import { Button } from "@mui/material";

const AddressCard = ({ addressItem, deleteAdd, editMode, handleEdit }) => {
  return (
    <div className="space-y-3 p-5 border w-96">
      <h1 className="font-bold text-xl">
        {addressItem?.firstName + " " + addressItem?.lastName}
      </h1>
      <hr />
      <div className="space-y-1">
        <p className="text-lg">{addressItem?.address}</p>
        <p className="text-lg">
          {addressItem?.city + ", " + addressItem?.state}
        </p>
        <p className="text-sm font-semibold">{addressItem?.pincode}</p>
      </div>
      <hr />
      <div className="space-y-1">
        <p className="font-semibold">phone Number</p>
        <p>{addressItem?.contact}</p>
      </div>
      <hr />
      <div className="flex justify-around">
        <Button
          onClick={() => handleEdit(addressItem)}
          variant="contained"
          color="success"
          size="small"
          disabled={editMode}
        >
          Edit
        </Button>
        <Button
          onClick={() => deleteAdd(addressItem?._id)}
          variant="contained"
          color="error"
          size="small"
          disabled={editMode}
        >
          delete
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
