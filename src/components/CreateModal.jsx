import React, { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  fetchNotes,
  setContent,
  setTitle,
  updateNote,
} from "../slices/NoteSlices";
import { CircleX } from "lucide-react";

const CreateModal = ({ onClose, data = {} }) => {
  const title = useSelector((state) => state.notes.title);
  const content = useSelector((state) => state.notes.content);
  const mode = useSelector((state) => state.notes.mode);

  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "update") {
      dispatch(setTitle(data.title));
      dispatch(setContent(data.content));
    }
  }, [data, mode, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "update") {
        await dispatch(updateNote({ id: data.id, title, content })).unwrap();

        toast("✓ Note Updated!", {
          position: "bottom-left",
          duration: 2500,
          style: {
            color: "#ff9f8c",
          },
        });
      } else if (mode === "create") {
        await dispatch(addNote({ title, content })).unwrap();

        await dispatch(fetchNotes());
        toast("✓ Note created!", {
          position: "bottom-left",
          duration: 2500,
          style: {
            color: "#006400",
          },
        });
      }
      dispatch(setTitle(""));
      dispatch(setContent(""));
    } catch (error) {
      toast("Error Occured");
    }

    onClose();
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {mode === "create" ? "Create New Note" : "Update Note"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:cursor-pointer hover:text-gray-900"
            >
              <CircleX></CircleX>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Title
              </label>
              <input
                type="text"
                className="w-full rounded-lg border bg-gray-50 p-2 text-sm"
                value={title}
                onChange={(e) => dispatch(setTitle(e.target.value))}
                required
                placeholder="Enter title"
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-900">
                Content
              </label>
              <textarea
                rows="4"
                className="w-full rounded-lg border bg-gray-50 p-2 text-sm"
                value={content}
                onChange={(e) => dispatch(setContent(e.target.value))}
                required
                placeholder="Write content here..."
              />
            </div>

            <button
              type="submit"
              className="rounded-lg border border-transparent bg-amber-500 px-5 py-2.5 text-sm font-medium text-white hover:border hover:border-amber-400 hover:bg-gray-100 hover:text-amber-500"
            >
              {mode === "create" ? "Create Note" : "Update Note"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateModal;
