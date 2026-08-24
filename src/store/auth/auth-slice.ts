import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    loggedIn: false,
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
export default authSlice.reducer;
