import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setStatus } from "../slices/NoteSlices";

const Dropdown = () => {
  const status = useSelector((state) => state.notes.status);
  const open = useSelector((state) => state.notes.status);
  const dispatch = useDispatch();
  const statuses = ["Pending", "In Progress", "Completed", "Archived"];
  return (
    <div className="">
      <button
        className="inline-flex items-center rounded-lg bg-amber-100 px-5 py-2.5 text-center text-sm font-medium text-yellow-400 hover:bg-white hover:text-yellow-500 focus:ring-1 focus:outline-none"
        type="button"
        onClick={() => dispatch(setOpen(!open))}
      >
        {status}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-28 divide-y divide-gray-100 rounded-lg bg-white shadow-sm">
          <ul className="py-2 text-xs text-gray-700">
            {statuses.map((item) => (
              <li
                key={item}
                onClick={() => {
                  dispatch(setStatus(item));
                  dispatch(setOpen(false));
                }}
                className="cursor-pointer px-2 py-2 hover:bg-gray-100"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
