import React, { useState } from "react";
import api from "../api";

const CreateModal = ({ onClose, mode }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Content:", content);
    try {
      const res = await api.post("/api/notes/", { title, content });
      if (res.status === 401) {
        alert("not authorized");
      }
      if (res.status === 200) {
        console.log("note created");
      }
    } catch (error) {
      console.log(error);
    }

    onClose();
  };
  return (
    <>

      <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
        <div className="bg-white  p-6 rounded-lg w-full max-w-md shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200  mb-4 pb-2">
            <h3 className="text-lg font-semibold text-gray-900 ">
              {mode==='create'?"Create New Note":"Update Note"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 "
            >
              ✖
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-900 ">
                Title
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 text-sm bg-gray-50  "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter title"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-900 ">
                Content
              </label>
              <textarea
                rows="4"
                className="w-full border rounded-lg p-2 text-sm bg-gray-50  "
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="Write content here..."
              />
            </div>

            <button
              type="submit"
              className="bg-amber-500 border border-transparent hover:border-amber-400 hover:border text-white px-5 py-2.5 rounded-lg hover:bg-gray-100 hover:text-amber-500 text-sm font-medium"
            >
              Create Note
            </button>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default CreateModal;
