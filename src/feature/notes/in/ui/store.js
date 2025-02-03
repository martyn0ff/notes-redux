import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../redux/noteSlice.js";

const store = configureStore({
  // This is where we initialize all reducers
  // (root reducer)
  reducer: {
    notesSlice,
  },
});

export default store;
