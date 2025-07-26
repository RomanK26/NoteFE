import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (search = "") => {
    if (search) {
      console.log('search',search)
      const res = await api.get("/api/notes/", { params: { search } });
      return res.data;
    }
    const res = await api.get("/api/notes/");

    return res.data;
  },
);

export const addNote = createAsyncThunk(
  "notes/addnote",
  async ({ title, content }) => {
    try {
      const res = await api.post("/api/notes/", { title, content });
      return res.data;
    } catch (error) {
      console.error("Add Note Error:", error.response?.data || error.message);
      throw error;
    }
  },
);

export const updateNote = createAsyncThunk(
  "notes/updatenote",
  async ({ id, title, content, status }) => {
    try {
      const payload = {};
      if (title !== undefined) payload.title = title;
      if (content !== undefined) payload.content = content;
      if (status !== undefined) payload.current_status = status.toLowerCase();

      console.log("payload", payload);
      const res = await api.patch(`/api/notes/${id}/`, payload);
      console.log(res);

      if (res.status == 200) console.log("updated");
      return res.data;
    } catch (error) {
      console.error("Add Note Error:", error.response?.data || error.message);
      throw error;
    }
  },
);

export const removeNote = createAsyncThunk("notes/removeNote", async (id) => {
  const res = await api.delete(`/api/notes/${id}/`);

  if (res.status == 204) return id;
  throw new Error("Failed to delete");
});

const initialState = {
  notes: [],
  mode: "",
  data: {},
  search: "",
  title: "",
  content: "",
  status: "pending",
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {})
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {})
      .addCase(removeNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })
      .addCase(addNote.fulfilled, (state, action) => {
        console.log("Note Created:", action.payload);
        state.notes = [...state.notes, action.payload];
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        const index = state.notes.findIndex(
          (note) => note.id === updatedNote.id,
        );
        if (index !== -1) {
          state.notes[index] = updatedNote;
        }
      });
  },
});

export const {
  setMode,
  setData,
  setSearch,
  setStatus,
  setTitle,
  setContent,
  setOpen,
} = noteSlice.actions;

export default noteSlice.reducer;
