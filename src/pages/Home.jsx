import React, { useEffect, useState } from "react";
import api from "../api";
import { SquarePen, SquarePlus, Trash2, Trash2Icon } from "lucide-react";
import CreateModal from "../components/CreateModal";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import {
  addNote,
  fetchNotes,
  removeNote,
  setModal,
  setSearch,
} from "../slices/NoteSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const modal = useSelector((state) => state.notes.modal);
  const search = useSelector((state) => state.notes.search);
  const author = localStorage.getItem("username");
  const mode = useSelector((state) => state.notes.mode);
  const data = useSelector((state) => state.notes.data);
  const navigate = useNavigate();
  console.log("username->", author);
  console.log("notes", notes);

  // console.log('mode',mode)
  // console.log('modal',modal)
  useEffect(() => {
    dispatch(fetchNotes());
  }, [modal, search]);

  const handleCreate = (mode, id = null) => {
    console.log("created ");
    dispatch(addNote({ mode, id }));
  };
  const handleDelete = async (id) => {
    console.log("deleted");
    dispatch(removeNote(id));
  };

  return (
    <div className="w-full min-w-[230px]">
      <Navbar author={author} setSearch={setSearch} />

      <div className="grid grid-cols-1 gap-4 p-8 lg:grid-cols-4">
        {notes.map((note) => (
          <div
            className="flex flex-col justify-between border border-gray-300 bg-white p-4 shadow-2xs md:p-5 lg:min-h-[20rem]"
            key={note.id}
          >
            <div className="rounded-sm bg-gray-200 p-2">
              <h3 className="text-lg font-bold text-gray-800 uppercase">
                {note.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-gray-400">
                {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
            <p className="mt-2 flex-1 text-gray-800">{note.content}</p>
            <div className="flex justify-between">
              <button
                title="Edit note"
                className="rounded-md border border-transparent bg-amber-300 px-2.5 py-1 text-center text-sm text-black shadow-sm transition-all hover:cursor-pointer hover:border-amber-300 hover:bg-gray-50 hover:text-black hover:shadow"
                type="button"
                onClick={() => handleCreate("update", note.id)}
              >
                <SquarePen />
              </button>
              <button
                className="rounded-md border border-transparent bg-red-400 p-1 text-center text-sm text-white shadow-sm transition-all hover:cursor-pointer"
                type="button"
                onClick={() => handleDelete(note.id)}
                title="Delete Note"
              >
                <Trash2 className="h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className="fixed right-10 bottom-10 rounded-3xl border bg-amber-300 p-1 hover:cursor-pointer"
        onClick={() => handleCreate("create")}
      >
        <span className="flex">
          <SquarePlus />
          Create Note
        </span>
      </div>

      {modal && (
        <CreateModal
          onClose={() => dispatch(setModal(false))}
          mode={mode}
          data={data}
        />
      )}
    </div>
  );
};

export default Home;
