import mongoose from "mongoose";

const dbConnect = async () => {
  return await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err.message));
};

export { dbConnect };
