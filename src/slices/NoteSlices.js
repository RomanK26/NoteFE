import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (search = "") => {
    const res = await api.get("/api/notes/", { params: { search } });
    return res.data;
  },
);

export const removeNote = createAsyncThunk("notes/removeNote", async (id) => {
  await api.delete(`/api/notes/${id}/`);
  return id;
});

const initialState = {
  notes: [],
  modal: false,
  mode: "create",
  data: {},
  search: "",
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

export const { setModal, setMode, setData, setSearch } = noteSlice.actions;

export default noteSlice.reducer;
