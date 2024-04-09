import React, { useEffect, useRef, useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "../firebaseService";
import {
  updateFail,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Profile() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState("");
  const imageRef = useRef(null);
  const [imageProgress, setImageProgres] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [imageFlie, setimageFlie] = useState(null);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      //setloading(true)
      // dispatch(updateStart())

      const res = await fetch("/api/user/update/" + currentUser._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        /// setloading(false)
        dispatch(updateFail(data));
        return;
      }
      dispatch(updateSuccess(data));
    } catch (error) {
      console.log("error  " + error);
      dispatch(updateFail(error));
    }
  };

  useEffect(() => {
    if (imageFlie) {
      if (imageFlie.size <= 2257649) {
        handleImageUpload(imageFlie);
      } else {
        console.log(imageFlie);
        setImageError("File Size should be less then or equal to 2mb");
      }
    }
  }, [imageFlie]);

  const handleImageUpload = async (image) => {
    setImageError("");
    const storage = getStorage(firebaseApp);
    const filename = Date.now() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_change",
      (sanpshot) => {
        const progress =
          (sanpshot.bytesTransferred / sanpshot.totalBytes) * 100;
        setImageProgres(Math.round(progress));
      },
      (error) => {
        setImageError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, profilePhoto: downloadUrl });
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form
        onSubmit={handleUpdateProfile}
        method="POST"
        className="flex flex-col gap-4 p-4"
      >
        <input
          type="file"
          ref={imageRef}
          hidden
          name="profilePhoto"
          id=""
          accept="image/*"
          onChange={(e) => setimageFlie(e.target.files[0])}
        />
        <img
          src={formData.profilePhoto || currentUser.profilePhoto}
          className="w-24 h-24 self-center cursor-pointer rounded-full"
          alt="Profile Image"
          // name="profilePhoto"
          onClick={() => imageRef.current.click()}
        />
        <div className="text-center">
          {imageError ? (
            <span className="text-red-600 font-semibold text-center">
              Error while uploading profile image: {imageError}
            </span>
          ) : imageProgress > 0 && imageProgress < 100 ? (
            <span className="text-blue-600 font-semibold ">
              Upload image {imageProgress} %{" "}
            </span>
          ) : imageProgress === 100 ? (
            <span className="text-green-600 font-semibold">
              Profile image uploaded successfully
            </span>
          ) : (
            ""
          )}
        </div>
        <input
          type="text"
          className="bg-gray-100 p-3 rounded-lg"
          name="username"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          className="bg-gray-100 p-3 rounded-lg"
          name="email"
          id="useremail"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="text"
          className="bg-gray-100 p-3 rounded-lg"
          name="password"
          id="userpassword"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
          // defaultValue={currentUser.password}
        />
        <button
          className="bg-blue-700 p-4
         text-white rounded-xl uppercase
          hover:opacity-95 disabled:opacity-80"
          type="submit"
        >
          Update Profile
        </button>
      </form>
      <div className="flex gap-20 flex-row">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
