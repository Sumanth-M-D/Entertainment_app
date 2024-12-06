import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
  error: "",
  isLoading: "",
};

const bookmarkSlice = createSlice({
  name: "bookmarkSlice",
  initialState,
  reducers: {
    setBookmarks(state, action) {
      state.bookmarks = action.payload;
      state.error = "";
      state.isLoading = false;
    },

    setBookmarkError(state, action) {
      state.error = action.payload;
    },
    setBookmarkLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setBookmarks, setBookmarkError, setBookmarkLoading } =
  bookmarkSlice.actions;

export default bookmarkSlice.reducer;
