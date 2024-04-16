import User from "../models/user.model.js";
import { encrypt, decrypt, errorHandler } from "../service/service.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  console.log('signUP');
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
  //  console.log(req.body);
  
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
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
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
export const google = async (req, res, next) => {
  try {


  
    const finduser = await User.findOne({email:req.body.email} );
    if (finduser) {
      const accessToken = jwt.sign({ id: finduser._id }, process.env.JWT_TOKEN);
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      const { password: hashedpassword, ...rest } = finduser._doc;
      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }else{
 
      const tempPass= Math.random().toString(36).slice(-8) +Math.random().toString(36).slice(-8)
      let tempUserName= req.body.name.replaceAll(" ","")
      tempUserName += tempUserName.toLowerCase()+ Math.random().toString(10).slice(-5)
     console.log(tempUserName);

      const hashPassword = bcryptjs.hashSync(tempPass,10);
      const newuser = new User({ 
        username:tempUserName,
        email:req.body.email,
        password: hashPassword,
        profilePhoto:req.body.profilePhoto
            });
      await newuser.save();
      const token = jwt.sign({ id: newuser._id }, process.env.JWT_TOKEN);
      const { password: hashedPassword2, ...rest } = newuser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('accessToken', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
    }
    // const hashPassword = bcryptjs.compareSync(password, finduser.password);
    // if (!hashPassword) {
    //   return next(errorHandler(401, "Wrong credentials"));
    // }
    // const accessToken = jwt.sign({ id: finduser._id }, process.env.JWT_TOKEN);
    // const expiryDate = new Date(Date.now() + 3600);
    // const { password: hashedpassword, ...rest } = finduser._doc;
    // res
    //   .cookie("accessToken", accessToken, {
    //     httpOnly: true,
    //     expires: expiryDate,
    //   })
    //   .status(200)
    //   .json(rest);
   catch (err) {

    next(err);
  }
};

export const signOut = (req, res,next) => {
  try {
    res.clearCookie('accessToken').status(200).json('Sign out Successfully')
  } catch (error) {
    next(error)
  }
  
}
