import React, { useEffect } from "react";
import { SquarePen, SquarePlus, Trash2, Trash2Icon } from "lucide-react";
import CreateModal from "../components/CreateModal";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import {
  fetchNotes,
  removeNote,
  setContent,
  setData,
  setMode,
  setTitle,
} from "../slices/NoteSlices";
import { useDispatch, useSelector } from "react-redux";

import NoteCard from "../components/NoteCard";

const Home = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const data = useSelector((state) => state.notes.data);
  const mode = useSelector((state) => state.notes.mode);
  const filter = useSelector((state) => state.notes.filter);
  const author = localStorage.getItem("username");


  useEffect(() => {
    dispatch(fetchNotes({}));
  }, []);

  const handleCreate = async (mode, id = null) => {
    dispatch(setMode(mode));
  };

  const handleDelete = async (id) => {
    await dispatch(removeNote(id)).unwrap();

    toast.success(`Note  deleted!`, {
      position: "bottom-left",
      duration: 2500,
      style: {
        color: "#006400",
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full min-w-[230px] flex-col">
      <Navbar author={author} />
      {notes.length < 1 && (
        <div className="flex w-full flex-1 items-center justify-center">
          <h1 className="text-2xl leading-5 font-light tracking-wider text-gray-400 lg:text-5xl">
            {filter ? "No Notes found!" : "Create your first note!"}
          </h1>
        </div>
      )}

      {notes ? (
        <div className="grid grid-cols-1 gap-4 p-8 lg:grid-cols-4">
          {notes.map((note) => (
            <NoteCard
              note={note}
              handleDelete={handleDelete}
              handleCreate={handleCreate}
              key={note.id}
            />
          ))}
        </div>
      ) : (
        <div>Loading.....</div>
      )}

      <div
        className="fixed right-10 bottom-10 rounded-3xl border bg-amber-300 p-1 hover:cursor-pointer"
        onClick={() => handleCreate("create")}
      >
        <span className="flex">
          <SquarePlus />
          Create Note
        </span>
      </div>

      {mode &&
        (mode == "create" ? (
          <CreateModal
            onClose={() => {
              dispatch(setMode(""));
              dispatch(setTitle(""));
              dispatch(setContent(""));
            }}
          />
        ) : (
          <CreateModal
            onClose={() => {
              dispatch(setMode(""));
              dispatch(setData({}));
            }}
            data={data}
          />
        ))}
    </div>
  );
};

export default Home;
