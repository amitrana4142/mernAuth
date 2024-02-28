import User from "../models/user.model.js";
import { encrypt, decrypt, errorHandler } from "../service/service.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password);
  const newuser = new User({ username, email, password: hashPassword });
  try {
    await newuser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const finduser = await User.findOne({ email });
    if (!finduser) {
      return next(errorHandler(404, "User not found"));
    }
    const hashPassword = bcryptjs.compareSync(password, finduser.password);
    if (!hashPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const accessToken = jwt.sign({ id: finduser._id }, process.env.JWT_TOKEN);
    const expiryDate = new Date(Date.now() + 3600);
    const { password: hashedpassword, ...rest } = finduser._doc;
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
