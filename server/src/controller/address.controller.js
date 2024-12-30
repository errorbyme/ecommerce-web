import { Address } from "../models/address.model.js";

const addAddress = async (req, res) => {
  try {
    let {
      userId,
      firstName,
      lastName,
      address,
      city,
      state,
      pincode,
      contact,
    } = req.body;

    pincode = Number(pincode);
    contact = Number(contact);

    if (
      !userId ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !contact
    )
      return res.json({
        success: false,
        message: "invalid data !!",
      });

    const newlyCreatedAddress = new Address({
      userId,
      firstName,
      lastName,
      address,
      city,
      state,
      pincode,
      contact,
    });

    await newlyCreatedAddress.save();
    return res.json({
      success: true,
      message: "Address added !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};
const getAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId)
      return res.json({
        success: false,
        message: "invalid userId data !!",
      });

    const addressList = await Address.find({ userId });

    return res.json({
      success: true,
      data: addressList,
      message: "address fetched !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId)
      return res.json({
        success: false,
        message: "invalid userId data !!",
      });

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!address)
      return res.json({
        success: false,
        message: "address not found !!",
      });

    return res.json({
      success: true,
      data: address,
      message: "address edited !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId)
      return res.json({
        success: false,
        message: "invalid userId data !!",
      });

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address)
      return res.json({
        success: false,
        message: "address not found !!",
      });

    return res.json({
      success: true,
      message: "address deleted !!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};

export { addAddress, getAllAddress, editAddress, deleteAddress };
