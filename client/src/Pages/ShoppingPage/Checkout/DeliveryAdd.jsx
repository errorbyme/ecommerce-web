import { Box, Button, CircularProgress, Grid2, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  getAllAddresses,
} from "../../../Store/address-slice";
import { toast } from "react-toastify";

const DeliveryAdd = ({ isform, setIsForm, SetAddress }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const initialState = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    userId: user?.id,
    contact: "",
  };

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [currentAddId, setCurrentAddId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isTrue, setIsTrue] = useState(false);

  const { addressList, isLoading } = useSelector((state) => state.userAddress);

  useEffect(() => {
    if (addressList && addressList.length > 0) {
      SetAddress(addressList[0]);
      setIsForm(true);
    } else {
      setIsForm(false);
      SetAddress({});
    }
  }, [addressList]);

  useEffect(() => {
    if (isform) setIsTrue(true);
    else setIsTrue(false);
  }, [isform]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editMode
        ? editAddress({ userId: user?.id, addressId: currentAddId, formData })
        : addNewAddress(formData)
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllAddresses(user?.id));
        toast.success(data?.payload?.message);
        setEditMode(false);
        setIsTrue(true);
        setCurrentAddId("");
        setFormData(initialState);
      } else {
        toast.warn(data?.payload?.message);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const isDisabled = !isFormValid();

  useEffect(() => {
    dispatch(getAllAddresses(user?.id));
  }, [dispatch]);

  const deleteAdd = async (addressId) => {
    dispatch(deleteAddress({ userId: user?.id, addressId })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllAddresses(user?.id));
        toast.success(data?.payload?.message);
      } else {
        toast.warn(data?.payload?.message);
      }
    });
  };

  const handleCancel = async () => {
    setEditMode(false);
    setFormData(initialState);
    setCurrentAddId("");
    setIsTrue(true);
  };
  const handleEdit = async (addressInfo) => {
    setEditMode(true);
    setIsTrue(false);
    setCurrentAddId(addressInfo?._id);
    setFormData({
      ...formData,
      firstName: addressInfo?.firstName,
      lastName: addressInfo?.lastName,
      address: addressInfo?.address,
      city: addressInfo?.city,
      state: addressInfo?.state,
      pincode: addressInfo?.pincode,
      contact: addressInfo?.contact,
    });
  };

  return (
    <div className="">
      <Grid2 container spacing={4}>
        <Grid2
          size={{ xs: 12, lg: 5 }}
          className="rounded-e-md shadow-md overscroll-y-scroll"
        >
          <div className="p-5 py-7 cursor-pointer gap-5 flex flex-wrap">
            {addressList &&
              addressList.length > 0 &&
              addressList.map((addressItem, i) => (
                <AddressCard
                  key={i}
                  handleEdit={handleEdit}
                  editMode={editMode}
                  addressItem={addressItem}
                  deleteAdd={deleteAdd}
                />
              ))}
            {addressList.length === 0 && (
              <div className="p-5 font-semibold">No Data</div>
            )}
          </div>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 7 }}>
          <div className="relative h-full">
            <Box className="border rounded-s-md shadow-md p-5 sticky top-16">
              <form action="" onSubmit={handleSubmit} disabled>
                <Grid2 container spacing={3}>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      name="firstName"
                      label="First Name"
                      autoComplete="given-name"
                      fullWidth
                      value={formData.firstName || ""}
                      onChange={handleChange}
                      disabled={isTrue}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      name="lastName"
                      disabled={isTrue}
                      label="Last Name"
                      autoComplete="given-name"
                      fullWidth
                      value={formData.lastName || ""}
                      onChange={handleChange}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <TextField
                      disabled={isTrue}
                      required
                      name="address"
                      label="Address"
                      autoComplete="given-name"
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.address || ""}
                      onChange={handleChange}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      disabled={isTrue}
                      required
                      name="city"
                      label="City"
                      autoComplete="given-name"
                      fullWidth
                      value={formData.city || ""}
                      onChange={handleChange}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      disabled={isTrue}
                      name="state"
                      label="State"
                      autoComplete="given-name"
                      fullWidth
                      value={formData.state || ""}
                      onChange={handleChange}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      disabled={isTrue}
                      required
                      name="pincode"
                      type="number"
                      label="Zip/Postal code"
                      autoComplete="shipping postal-code"
                      fullWidth
                      value={formData.pincode || ""}
                      onChange={handleChange}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      type="number"
                      name="contact"
                      label="Contact Number"
                      disabled={isTrue}
                      autoComplete="given-name"
                      fullWidth
                      value={formData.contact || ""}
                      onChange={handleChange}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Button
                      fullWidth
                      type="submit"
                      size="large"
                      variant="contained"
                      disabled={isDisabled || isLoading}
                    >
                      {!isLoading ? (
                        editMode ? (
                          "Update The Address"
                        ) : (
                          "Add the Address"
                        )
                      ) : (
                        <CircularProgress size={25} />
                      )}
                    </Button>
                    {isform && (
                      <p className="opacity-60 text-md pt-3">
                        *You can add one address at a time
                      </p>
                    )}
                  </Grid2>
                  {editMode && (
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                      <Button
                        fullWidth
                        type="submit"
                        size="large"
                        color="warning"
                        variant="contained"
                        disabled={isLoading}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Grid2>
                  )}
                </Grid2>
              </form>
            </Box>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default DeliveryAdd;
