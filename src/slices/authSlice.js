import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await api.post("/api/token/", { username, password });
      console.log(res.status);
      if (res.status == 200) {
        console.log("inside");
        localStorage.setItem("username", username);
      }

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

const initialState = {
  username: "",
  password: "",
  authenticated: null,
  pass:false
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
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    showPassword:(state,action)=>{
      state.pass = action.payload
    }
    
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("accessToken", action.payload.access);
      localStorage.setItem("refreshToken", action.payload.refresh);
    });
  },
});

export const { setUsername, setPassword, logout ,setAuthenticated,showPassword} = authSlice.actions;
export default authSlice.reducer;
