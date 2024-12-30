import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import authRouters from "./routers/auth.router.js";
import adminProductRouters from "./routers/admin/product.router.js";
import userProductRouters from "./routers/userProducts.router.js";
import userCartRouters from "./routers/cart.router.js";
import addressRouters from "./routers/address.router.js";
import reviewRouters from "./routers/review.router.js";
import orderRouters from "./routers/order.router.js";
import adminOrderRouters from "./routers/admin/order.router.js";
import searchRouters from "./routers/search.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4444;

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouters);
app.use("/api/admin/products", adminProductRouters);
app.use("/api/user/products", userProductRouters);
app.use("/api/user/cart", userCartRouters);
app.use("/api/user/address", addressRouters);
app.use("/api/user/review", reviewRouters);
app.use("/api/user/order", orderRouters);
app.use("/api/admin/order", adminOrderRouters);
app.use("/api/search", searchRouters);

app.get("/", (req, res) => res.send("Hey Server"));

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
