import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loggedIn: localStorage.getItem("token"),
    serverErrors: [],
  },
  reducers: {
    setLoggedIn: (currentSlice, action) => {
      currentSlice.loggedIn = action.payload;
    },
    setServerErrors: (currentSlice, action) => {
      currentSlice.serverErrors = action.payload;
    },
  },
});

export const { setLoggedIn, setServerErrors } = authSlice.actions;
