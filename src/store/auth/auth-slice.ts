import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    loggedIn: JSON.parse(localStorage.getItem('loggedIn') || 'false'),
    serverErrors: [],
  },
  reducers: {
    setLoggedIn: (currentSlice, action) => {
      currentSlice.loggedIn = action.payload;
      localStorage.setItem('loggedIn', JSON.stringify(action.payload));
    },
    setServerErrors: (currentSlice, action) => {
      currentSlice.serverErrors = action.payload;
    },
  },
});

export const { setLoggedIn, setServerErrors } = authSlice.actions;
export default authSlice.reducer;
