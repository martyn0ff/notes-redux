import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./slice/noteSlice";

const store = configureStore({
  // This is where we initialize all reducers
  // (root reducer)
  reducer: {
    notesSlice,
  },
});

export default store;
