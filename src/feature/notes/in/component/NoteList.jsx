import { useDispatch, useSelector } from "react-redux";
import Note from "./Note.jsx";
import { createSelector } from "@reduxjs/toolkit";
import { selectors, thunks } from "../redux/noteSlice.js";
import { useEffect } from "react";
import LoadingStatus from "../../../../common/domain/loadingStatus.js";

// Create memoized selector. Note that it resides
// outside of component function
const displayedNotes = createSelector(
  [selectors.selectAllNotes, selectors.selectIsImportantOnly],
  (notes, importantOnly) => {
    if (importantOnly) {
      return notes.filter((note) => note.isImportant);
    } else {
      return notes;
    }
  },
);

function NotesList() {
  const dispatch = useDispatch();
  const notes = useSelector(displayedNotes);
  const status = useSelector(selectors.selectNotesStatus);
  const error = useSelector(selectors.selectNotesError);

  useEffect(() => {
    if (status === LoadingStatus.IDLE) {
      dispatch(thunks.fetchNotes());
    }
  }, [status, dispatch]);

  return chooseContent(status, error, notes);
}

function chooseContent(status, error, notes) {
  if (status === LoadingStatus.LOADING) {
    return (
      <span>
        <i>Loading...</i>
      </span>
    );
  }
  if (status === LoadingStatus.ERROR) {
    return <span>⚠️ There was an error loading notes: {error}</span>;
  }
  if (status === LoadingStatus.COMPLETE) {
    return (
      <div className="notes-list">
        <h1>My Notes</h1>
        <ul>
          {notes.map((note) => (
            // key goes HERE only, no need
            // to put into <li>'s
            <Note key={note.id} note={note} />
          ))}
        </ul>
      </div>
    );
  }
}

export default NotesList;
