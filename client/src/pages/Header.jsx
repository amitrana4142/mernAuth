import React from "react";
import { Link } from "react-router-dom";

function Header() {
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
            <Link to={'/profile'}>

            <li>Profile</li>
            </Link>
            <Link to={"/sign-in"}>
              <li>Sign In</li>
            </Link>
            <Link to={'/sign-up'}>
              <li>Sign up</li>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
