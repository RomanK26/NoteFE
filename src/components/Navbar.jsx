import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../slices/authSlice";
import { fetchNotes, setSearch } from "../slices/NoteSlices";
import SortBy from "./SortBy";

const Navbar = ({ author }) => {
  const search = useSelector((state) => state.notes.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes(search));
  }, [search]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex w-full items-center justify-between border bg-amber-300 p-1">
      <h1 className="text-sm leading-2 font-medium -tracking-wider">
        MemoRizz
      </h1>
      <div className="flex-end flex justify-between gap-3 sm:m-2 lg:w-1/4">
        <SortBy />

        <input
          type="search"
          name=""
          id=""
          placeholder="search"
          className="hidden flex-1 rounded-md border border-gray-400 bg-gray-100 px-2 sm:hidden lg:block lg:w-1/2"
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <div className="flex items-center gap-2">
          <div className="mr-4 rounded-full bg-white p-2 text-xs">{author}</div>
          <button
            className="rounded-lg border border-gray-300 bg-white p-1 hover:cursor-pointer hover:border-gray-900"
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
