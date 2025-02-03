import { createSlice } from "@reduxjs/toolkit";
import Note from "../../domain/note.js";
import NoteEditor from "../../domain/noteEditor.js";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    importantOnly: false,
    notes: [],
    noteEditor: NoteEditor.newEditor().asDumbObject(),
  },
  // Even though it appears that we simply  mutate state,
  // Immer under the hood actually returns new state every time
  // we access a setter
  reducers: {
    // Note Editor
    add: (state, action) => {
      const newNote = action.payload;
      state.notes = state.notes.concat(newNote);
    },
    remove: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
    },
    updateNoteEditor: (state, action) => {
      state.noteEditor = action.payload;
    },
    toggleImportantOnly: (state) => {
      state.importantOnly = !state.importantOnly;
    },

    // Note
    toggleImportance: (state, action) => {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          const noteObj = Note.fromObject(note);
          return noteObj.withToggledImportance().asDumbObject();
        }
        return note;
      });
    },
  },
});

export const {
  add,
  remove,
  toggleImportance,
  updateNoteEditor,
  toggleImportantOnly,
} = noteSlice.actions;
export default noteSlice.reducer;
