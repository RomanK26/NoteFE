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
  setOpen,
  setSearch,
  setTitle,
} from "../slices/NoteSlices";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../components/Dropdown";

const Home = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const data = useSelector((state) => state.notes.data);
  const mode = useSelector((state) => state.notes.mode);
  const author = localStorage.getItem("username");

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  const handleCreate = async (mode, id = null) => {
    dispatch(setMode(mode));
  };

  const handleDelete = async (id) => {
    await dispatch(removeNote(id)).unwrap();

    toast.success(`Note  deleted!`, {
      position: "bottom-right",
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
            Create your first note!
          </h1>
        </div>
      )}

      {notes ? (
        <div className="grid grid-cols-1 gap-4 p-8 lg:grid-cols-4">
          {notes.map((note) => (
            <div
              className="flex flex-col justify-between border border-gray-300 bg-white p-4 shadow-2xs md:p-5 lg:min-h-[20rem]"
              key={note.id}
            >
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
