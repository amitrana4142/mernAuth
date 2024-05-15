import React, { useEffect, useRef, useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "../firebaseService";
import {
  deleteFail,
  deleteStart,
  deleteSuccess,
  signout,
  updateFail,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
function Profile() {
  const dispatch = useDispatch();
  // const navigator = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState("");
  const imageRef = useRef(null);
  const [imageProgress, setImageProgres] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [imageFlie, setimageFlie] = useState(null);
  const [PUSuccess, setPUSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart())

      const res = await fetch("/api/user/update/" + currentUser._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        /// setloading(false)
        setPUSuccess(false);
        dispatch(updateFail(data));
        return;
      }
      dispatch(updateSuccess(data));
      setPUSuccess(true);
    } catch (error) {
      dispatch(updateFail(error));
      console.log("error  " + error);
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
  const handleDeleteProfile = async () => {
    
    try {
      dispatch(deleteStart())
    const res = await fetch("/api/user/delete/" + currentUser._id, {
      method: "delete"
    });
    const data = await res.json();
    if (data.success===false){
        dispatch(deleteFail(data))
    }
    dispatch(deleteSuccess(data))
    } catch (error) {
      dispatch(deleteFail(error))
};
  
}

const handleSignout = async ()=>{
  try {
    await fetch('/api/auth/sign-out')
    dispatch(signout())
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form
        onSubmit={(e) => handleUpdateProfile(e)}
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
          type="password"
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
          {loading ? "Loading..." : " Update Profile"}
        </button>
      </form>
      <div className="flex m-4 justify-between flex-row">
        <span className="text-red-700 cursor-pointer"  onClick={handleDeleteProfile}>Delete Account</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>Sign out</span>
      </div>
      <p className="text-red-700 ">{error && "Something went wrong!"}</p>
      <p className="text-green-700 ">
        {PUSuccess && "Profile updated successfully"}
      </p>
    </div>
  );
}

export default Profile;
