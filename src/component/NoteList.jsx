import { useSelector } from "react-redux";
import Note from "./Note.jsx";
import { createSelector } from "@reduxjs/toolkit";

// Create memoized selector. Note that it resides
// outside of component function
const displayedNotes = createSelector(
  [
    (state) => state.notesSlice.notes,
    (state) => state.notesSlice.importantOnly,
  ],
  (notes, importantOnly) => {
    if (importantOnly) {
      return notes.filter((note) => note.isImportant);
    } else {
      return notes;
    }
  },
);

function NotesList() {
  const notes = useSelector(displayedNotes);

  return (
    <div className="notes-list">
      <h1>My Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
