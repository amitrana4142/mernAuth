import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
export default function SignUp() {
  const [formData, setFormData] =useState({})
  const [error,setError]= useState(false)
  const [loading,setLoading]= useState(false)
  const handlechange =(e)=>{
    setFormData ({...formData,[e.target.name]:e.target.value})

  }
  const navigator= useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      setError(false)
      const res = await fetch ('/api/auth/sign-up',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)});
        
        setLoading(false)
        const data=await res.json();
        if (data.success === false){
          setError(true)
          return;
        }

       navigator('/sign-in')
      } catch (error) {
        setLoading(false)
        setError(true)
        
      }
      }

  return (
    <div>
      <div className="max-w-lg p-4 mx-auto">
        <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
        <form onSubmit={handleSubmit}className="flex flex-col gap-4 p-4">
          {/* <label htmlFor="username">Username</label> */}
          <input
            type="text"
            name="username"
            onChange={handlechange}
            className="bg-gray-100 p-3 rounded-lg"
            id="username"
            placeholder="Username"
          />
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            name="email"
            onChange={handlechange}
            className="bg-gray-100 p-3 rounded-lg"
            id="useremail"
            placeholder="Email"
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            name="password"
            onChange={handlechange}
            className="bg-gray-100 p-3 rounded-lg"
            id="userpass"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-green-700 p-4 text-white rounded-xl uppercase hover:opacity-95 disabled:opacity-80"
            name="submit"
            disabled={loading}
          >{loading? 'Loading...':'Sign up' } </button>
        </form>
        <div className="flex mx-4 gap-2">
          <p>
            Have an account? 
          </p>
            <Link to="/sign-in">
              <span className="text-blue-600 ">SignIn</span>
            </Link>
        </div>
        <div className="text-red-500 mx-4 ">
          {error&&'There is an error'}
        </div>
      </div>
    </div>
  );
}
