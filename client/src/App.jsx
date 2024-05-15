import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Header from "./pages/header";
import PrivateRoute from "./pages/PrivateRoute";



export default function App() {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        
        <Route element={<PrivateRoute />}>

        <Route path="/profile" element={<Profile />}></Route>
        </Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>

      </Routes>
    </BrowserRouter>
  );
}
