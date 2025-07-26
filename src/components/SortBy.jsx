import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, setFilter, setSearch } from "../slices/NoteSlices";

const SortBy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const sortBy = ["pending", "in progress", "completed"];

  const handleSort = async (item) => {
    await dispatch(fetchNotes({ filter: item }));
    setIsOpen(false);
  };
  return (
    <div className="">
      <button
        className={`hidden w-16 items-center rounded-lg bg-white py-4 text-center text-xs/2 font-medium text-yellow-500 capitalize hover:cursor-pointer focus:ring-1 focus:outline-1 lg:block`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        filter
      </button>

      {isOpen && (
        <div className="absolute z-10 w-28 divide-y divide-amber-600 rounded-md bg-white shadow-sm">
          <ul className="rounded-md text-xs/3 text-gray-700">
            {sortBy.map((item) => (
              <li
                key={item}
                onClick={async () => {
                  await dispatch(setFilter(item));
                  await handleSort(item);
                }}
                className={`h-full cursor-pointer overflow-hidden rounded px-2 py-1.5 text-center font-thin capitalize hover:bg-gray-100`}
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

export default SortBy;
