import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (search = "") => {
    if (search) {
      const res = await api.get("/api/notes/", { params: { search } });
      return res.data;
    }
    const res = await api.get("/api/notes/");
    return res.data;
  },
);

export const removeNote = createAsyncThunk("notes/removeNote", async (id) => {
  const res = await api.delete(`/api/notes/${id}/`);
  // console.log("Delete response:", res);
  // console.log("deleted id", id);
  return id;
});

const initialState = {
  notes: [],
  modal: false,
  mode: "create",
  data: {},
  search: "",
  title: "",
  content: "",
  status: "idle",
  loading: false,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
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
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    addNote: (state, action) => {
      const { mode, id } = action.payload;
      state.mode = mode;
      state.modal = true;
      if (mode === "update" && id !== null) {
        const foundNote = state.notes.find((note) => note.id === id);
        state.data = foundNote || {};
      } else {
        state.data = {};
      }
    },

    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

export const {
  setModal,
  setMode,
  setData,
  setSearch,
  setAuthor,
  addNote,
  setTitle,
  setContent,
} = noteSlice.actions;

export default noteSlice.reducer;
