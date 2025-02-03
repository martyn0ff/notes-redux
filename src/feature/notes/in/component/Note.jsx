import { useDispatch } from "react-redux";
import { thunks } from "../redux/noteSlice.js";
import { useState } from "react";
import NoteObject from "../domain/note.js";

function Note({ note }) {
  const dispatch = useDispatch();
  const [thisNote, setThisNote] = useState(note);

  async function handleToggleImportanceClick() {
    const importanceUpdate = {
      id: note.id,
      isImportant: !thisNote.isImportant,
    };
    const response = await dispatch(thunks.setImportant(importanceUpdate));
    // We use local state here because we don't
    // want to re-render each note from the list
    // when we update importance on only one of them
    const updatedThisNote = NoteObject.fromObject(
      response.payload.data,
    ).asDumbObject();
    setThisNote(updatedThisNote);
  }

  async function handleDeleteNoteClick() {
    const id = thisNote.id;
    await dispatch(thunks.deleteNote({ id }));
  }

  return (
    <li>
      <span
        data-id={note.id}
        className={`note ${thisNote.isImportant ? "note-important" : ""}`}
      >
        {note.content}
      </span>

      <div className="btn-container">
        <button
          className="btn btn-toggle-importance"
          onClick={handleToggleImportanceClick}
        >
          ⚠️
        </button>

        <button className="btn btn-delete-note" onClick={handleDeleteNoteClick}>
          ❌
        </button>
      </div>
    </li>
  );
}

export default Note;
