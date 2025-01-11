// userSlice.js (Redux slice)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Initially, no user is logged in
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Set user data when logged in
    },
    userSignedIn(state, action) {
      console.log("Payload:", action.payload);
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null; // Reset user data when logged out
    },
  },
});

export const { login, userSignedIn, logout } = userSlice.actions;

export default userSlice.reducer;
