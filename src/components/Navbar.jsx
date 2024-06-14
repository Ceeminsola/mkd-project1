import React from "react";
import { AuthContext } from "../authContext";
import { GlobalContext } from "../globalContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { dispatch: authDispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);

  const handleLogout = () => {
    localStorage.clear();
    authDispatch({ type: "LOGOUT" });
    globalDispatch({ type: "SNACKBAR", payload: { message: "Logged out successfully!" } });
    navigate("/admin/login");
  };

  return (
    <nav className="bg-[#111111] p-4 m-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-[2rem] font-bold">APP</div>
        <button
          onClick={handleLogout}
          className="bg-[#9BFF00]  hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;