// userSlice.js (Redux slice)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  savedArticles: [], 
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
    saveArticleToProfile(state, action) {
      // Add the article to the savedArticles array
      state.savedArticles.push(action.payload);
    },
    setSavedArticles(state, action) {
      // Set savedArticles with the fetched articles
      state.savedArticles = action.payload;
    },
  },
});

export const { login, userSignedIn, logout,saveArticleToProfile, setSavedArticles } = userSlice.actions;

export default userSlice.reducer;
