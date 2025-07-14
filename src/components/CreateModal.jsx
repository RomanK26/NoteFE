import React, { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

const CreateModal = ({ onClose, mode, data }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (mode === "update") {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Title:", title);
    console.log("Content:", content);

    try {
      let res;

      if (mode === "update" && data?.id) {
        res = await api.put(`/api/notes/${data.id}/`, { title, content });
        if (res.status === 200) {
          toast("Note Updated!", {
            position: "bottom-right",
            duration: 2500,
            style: {
              color: "#ff9f1c",
            },
          });
        }
      } else {
        res = await api.post("/api/notes/", { title, content });
        if (res.status === 201) {
          toast("Note created!", {
            position: "bottom-right",
            duration: 2500,
            style: {
              color: "#006400",
            },
          });
        }
      }
    } catch (error) {
      toast("Error Occured");
    }

    onClose();
  };
  return (
    <>
      <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-300">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {mode === "create" ? "Create New Note" : "Update Note"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900"
            >
              ✖
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
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setContent(e.target.value)}
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
