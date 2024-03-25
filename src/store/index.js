import { configureStore } from "@reduxjs/toolkit";
import { noteSlice } from "./note/note-slice";

export const store = configureStore({
  reducer: {
    NOTE: noteSlice.reducer,
  },
});
