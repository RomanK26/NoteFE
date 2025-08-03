import React from "react";
import Dropdown from "./Dropdown";
import { SquarePen, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setData } from "../slices/NoteSlices";

const NoteCard = ({ note, handleDelete, handleCreate }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col justify-between border border-gray-300 bg-white p-4 shadow-2xs md:p-5 lg:min-h-[20rem]">
        <div className="space-y-2 rounded-sm bg-gray-100 p-2">
          <div className="flex justify-between overflow-hidden text-wrap">
            <h3 className="max-w-[70%] truncate text-lg font-bold text-gray-800 uppercase">
              {note.title}
            </h3>
            <Dropdown status={note.current_status} id={note.id} />
          </div>
          <p className="mt-1 text-end text-xs/2 leading-1 font-thin text-gray-400">
            {new Date(note.created_at).toLocaleString()}
          </p>
        </div>
        <p className="mt-2 flex-1 rounded-md border-t border-amber-400 pt-1 text-gray-800">
          {note.content}
        </p>
        <div className="flex justify-between">
          <button
            title="Edit note"
            className="rounded-md border border-transparent bg-amber-300 p-0.5 text-center text-black shadow-sm transition-all hover:cursor-pointer hover:border-amber-300 hover:bg-gray-50 hover:text-black hover:shadow"
            type="button"
            onClick={() => {
              dispatch(
                setData({
                  title: note.title,
                  content: note.content,
                  id: note.id,
                  status: note.status,
                }),
              );
              handleCreate("update", note.id);
            }}
          >
            <SquarePen className="h-4" />
          </button>
          <button
            className="rounded-md border border-red-500 p-0.5 text-center text-sm text-red-500 shadow-sm transition-all hover:cursor-pointer"
            type="button"
            onClick={() => handleDelete(note.id)}
            title="Delete Note"
          >
            <Trash2 className="h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
