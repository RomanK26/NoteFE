import React, { useEffect, useState } from "react";
import api from "../api";
import { SquarePlus } from "lucide-react";
import CreateModal from "../components/CreateModal";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [data, setData] = useState({});

  useEffect(() => {
    getNotes();
  }, [modal]);

  const getNotes = async () => {
    const res = await api.get("/api/notes/");
    console.log(res);
    setNotes(res.data);
  };

  const handleCreate = (mode,id=null) => {
    setModal(true);
    setMode(mode);
    setData(notes.find(note=>note.id===id))

  };
  const handleDelete = async (id) => {
    const res = await api.delete(`/api/notes/${id}/`);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 p-8">
          {notes.map((note) => (
            <div
              className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl p-4 md:p-5  dark:border-neutral-700 dark:shadow-neutral-700/70"
              key={note.id}
            >
              <div className="bg-gray-200 border rounded-sm p-2">
                <h3 className="text-lg font-bold text-gray-800 ">
                  {note.title}
                </h3>
                <p className="mt-1 text-xs font-medium  text-gray-900 ">
                  Author: {note.author}
                </p>
              </div>
              <p className="mt-2 text-gray-800 ">{note.content}</p>
              <div className="flex justify-between">
                <button
                  className="rounded-md bg-amber-300 py-1 px-2.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow  hover:border-amber-300 hover:text-black hover:bg-gray-50  "
                  type="button"
                  onClick={() => handleCreate("update",note.id)}
                >
                  Update
                </button>
                <button
                  className="rounded-md bg-red-400 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm "
                  type="button"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          className="hover:cursor-pointer absolute bottom-10 right-10 border bg-amber-300 rounded-3xl p-1"
          onClick={() => handleCreate("delete")}
        >
          <span className="flex">
            <SquarePlus />
            Create Note
          </span>
        </div>
      </div>
      {modal && <CreateModal onClose={() => setModal(false)} mode={mode} />}
    </div>
  );
};

export default Home;
