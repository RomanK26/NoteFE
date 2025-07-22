import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/NoteSlices"
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    auth:authReducer
  },
});

// console.log('store',store.getState());
// console.log('store',store);
// console.log('reducers',notesReducer)