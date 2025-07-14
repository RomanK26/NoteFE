import React from "react";
import { useNavigate } from "react-router";

const Navbar = ({ author }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex w-full items-center justify-between border bg-amber-300 p-1">
      <div>Note App</div>
      <div className="flex-end flex justify-between sm:m-2 lg:w-1/4 gap-3">
        <input
          type="search"
          name=""
          id=""
          placeholder="search"
          className="sm:hidden flex-1 rounded-md border px-2 lg:block hidden lg:w-1/2"
        />
        <div className="flex items-center gap-2">
          <div className="pr-4">{author}</div>
          <button
            className="rounded-lg border border-orange-500 bg-white p-1 hover:cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
