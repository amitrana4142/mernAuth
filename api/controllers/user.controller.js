import jwt from "jsonwebtoken";
import User from '../models/user.model.js'
import { errorHandler } from "../service/service.js";

export const verifyUser = (req, res, next) => {
  //console.log(req.cookies);
  const token = req.cookies.accessToken;
  if (!token) return next(errorHandler(401,'Please Log in'))
  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(errorHandler(403 ,"Token expired "));
    req.user = user;
    next();
  });
};

export const UpdateProfile = async (req, res, next) => {
  // console.log(req);
  try {
    if (req.user.id !== req.params.id){
      return next(errorHandler(401,'Only owners are allow to update their details'))
    }
    if (req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password ,10);
    }
   const updateUser = await User.findByIdAndUpdate(req.params.id ,
    {
      $set :{
        username : req.body.username,
        email : req.body.email,
        password: req.body.password,
        profilePhoto: req.body.profilePhoto

      }
    },
    {new : true}
  )
  const { password, ...rest } = updateUser._doc;
  res.status(200).json(rest)
  } catch (error) {
    next()
  }
};
