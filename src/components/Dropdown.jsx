import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setStatus, updateNote } from "../slices/NoteSlices";

const Dropdown = ({ id, status }) => {
  const open = useSelector((state) => state.notes.open);
  const dispatch = useDispatch();
  const statuses = ["pending", "in progress", "completed"];
  const statusStyles = {
    pending: "text-yellow-600 bg-yellow-100",
    "in progress": "text-blue-600 bg-blue-200",
    completed: "text-green-600 bg-green-100",
  };

  console.log("status", status);

  const handleUpdate = async (updatedStatus) => {
    await dispatch(updateNote({ id: id, status: updatedStatus })).unwrap();
  };
  return (
    <div className="">
      <button
        className={`inline-flex items-center rounded-lg px-2 py-1.5 text-end text-xs/2 font-medium capitalize hover:bg-white hover:text-yellow-500 focus:ring-1 focus:outline-none ${statusStyles[status]}`}
        type="button"
        onClick={() => dispatch(setOpen(!open))}
      >
        {status}
      </button>

      {open && (
        <div className="absolute z-10 w-28 divide-y  shadow-sm">
          <ul className="rounded-md text-xs/3 text-gray-700">
            {statuses.map((item) => (
              <li
                key={item}
                onClick={async () => {
                  console.log("item", item);
                  await dispatch(setStatus(item));
                  handleUpdate(item);
                  dispatch(setOpen(false));
                }}
                className={`h-full cursor-pointer overflow-hidden rounded px-2 py-1.5 text-center capitalize hover:bg-gray-100 ${statusStyles[item]}`}
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
