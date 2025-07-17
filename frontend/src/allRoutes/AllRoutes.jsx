import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import SignUp from "../pages/loginAndSignUp/SignUp";
import Login from "../pages/loginAndSignUp/Login";
import Chat from "../pages/Chat";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
