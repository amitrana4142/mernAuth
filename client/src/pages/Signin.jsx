import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "./OAuth";

function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [inpError, setinpError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.email !== undefined && formData.password!==undefined){
        setinpError(null)
      dispatch(signIn());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigator("/");
    }else{

      setinpError('Please fill all the details')
    }
    } catch (err) {
      console.log(err);
      dispatch(signInFailure(err));
    }
  };
  return (
    <div className="max-w-lg p-4 mx-auto">
      <h1 className="text-3xl text-center font-semibold">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-4 p-4"
      >
        {/* <input
          onChange={handleChange}
          type="text"
          className="bg-gray-100 p-3 rounded-lg"
          name="username"
          id="username"
          placeholder="Username"
        /> */}
        <input
          type="email"
          className="bg-gray-100 p-3 rounded-lg"
          name="email"
          onChange={handleChange}
          id="useremail"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          type="password"
          className="bg-gray-100 p-3 rounded-lg"
          name="password"
          id="userpass"
          placeholder="Password"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 p-4 text-white rounded-xl uppercase hover:opacity-95 disabled:opacity-80"
          name="submit"
        >
          {loading ? "Loading..." : "sign in"}
        </button>
        <OAuth />
        <div className="flex mx-1 gap-2">
          <p>Don't have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-600 ">SignUp</span>
          </Link>
        </div>
      </form>
      <div className="text-red-500 mx-4">{error ? error.message||'Something went wrong' :'' }</div>
      <p className="text-red-500 mx-4 ">{inpError && inpError}</p>
    </div>
  );
}

export default Signin;
