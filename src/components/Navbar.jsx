import React from "react";
import { useDispatch } from "react-redux";
import { replace, useNavigate } from "react-router";
import { logout } from "../slices/authSlice";

const Navbar = ({ author, setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex w-full items-center justify-between border bg-amber-300 p-1">
      <div>Note App</div>
      <div className="flex-end flex justify-between gap-3 sm:m-2 lg:w-1/4">
        <input
          type="search"
          name=""
          id=""
          placeholder="search"
          className="hidden flex-1 rounded-md border bg-gray-100 px-2 sm:hidden lg:block lg:w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <div className="mr-4 rounded-full bg-white p-2 text-xs">{author}</div>
          <button
            className="rounded-lg border bg-white p-1 hover:cursor-pointer"
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
