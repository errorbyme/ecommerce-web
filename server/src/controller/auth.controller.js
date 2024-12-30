import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.json({ success: false, message: "user already exists" });

    const hashpassword = await bcrypt.hash(password, 8);
    const newUser = new User({
      fullName,
      email,
      password: hashpassword,
    });

    await newUser.save();
    return res.json({ success: true, message: "register success" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { password, email } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (!userExists)
      return res.json({ success: false, message: "user doesn't exist" });

    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid)
      return res.json({ success: false, message: "invalid password" });

    const token = jwt.sign(
      {
        id: userExists._id,
        role: userExists.role,
        email: userExists.email,
        fullName: userExists.fullName,
      },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "login success",
      user: {
        fullName: userExists.fullName,
        email: userExists.email,
        role: userExists.role,
        id: userExists._id,
      },
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      path: "/",
      httpOnly: false,
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.json({ success: false, message: "unauthorised user!" });

    const decodedToken = jwt.verify(token, "SECRET_KEY");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "unauthorised user",
    });
  }
};

export { loginUser, registerUser, logoutUser, authMiddleware };
