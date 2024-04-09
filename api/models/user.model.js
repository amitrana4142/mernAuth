import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePhoto: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20230806/original/pngtree-avatar-profile-icon-black-background-vector-vector-picture-image_10007086.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
