import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const login = createAsyncThunk("auth/login", async ({ username, password }) => {
  try {
    const res = await api.post("/api/token/", { username, password });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
  }
});

const initialState = {
  username: "",
  password: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("accessToken", action.payload.access);
      localStorage.setItem("refreshToken", action.payload.refresh);
    });
  },
});

export const { setUsername, setPassword } = authSlice.actions;
export default authSlice.reducer;
