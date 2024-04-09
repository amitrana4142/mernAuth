import React from "react";
import { useSelector } from "react-redux";
import { Link, json } from "react-router-dom";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <nav className="bg-slate-300">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to={"/"}>
            <h1 className="font-bold">Mern Auth</h1>
          </Link>
          <ul className="flex gap-4">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            {/* <Link to={"/profile"}>
              <li>Profile</li>
            </Link> */}

            {currentUser ? (
              <div
                style={{}}
               
              ><Link to={'/profile'} >
                <img src={currentUser?.profilePhoto}   className="h-8 w-8  rounded-full object-cover" alt="Profile" />
              </Link>
              </div>
            ) : (
              <Link to={"/sign-in"}>
                <li>Sign In</li>
              </Link>
            )}
            {/* <Link to={'/sign-up'}>
              
              <li>Sign up</li>
            </Link> */}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
