import { useDispatch, useSelector } from "react-redux";
import { add, updateNoteEditor } from "../redux/slice/noteSlice.js";
import NoteEditorModel from "../domain/noteEditor.js";
import Note from "../domain/note.js";

function NoteEditor() {
  // shorthand for store.dispatch({ type: ..., payload: ... })
  const dispatch = useDispatch();
  // https://redux.js.org/usage/deriving-data-selectors
  // Selectors simply retrieve the data from the Redux store
  const noteEditor = useSelector((state) => state.notesSlice.noteEditor);

  function addNote(content) {
    if (content.trim()) {
      const note = Note(content, false);
      dispatch(add(note.asDumbObject()));
      dispatch(updateNoteEditor(NoteEditorModel.newEditor().asDumbObject()));
    }
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    addNote(noteEditor.content);
  }

  function handleOnKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents newline in textarea
      handleOnSubmit(event);
    }
  }

  function handleOnChange(event) {
    const textAreaContent = event.target.value;
    const newNoteEditor = NoteEditorModel(textAreaContent);
    dispatch(updateNoteEditor(newNoteEditor.asDumbObject()));
  }

  return (
    <form className="notes-editor" onSubmit={handleOnSubmit}>
      <textarea
        placeholder="Write a note..."
        rows="5"
        value={noteEditor.content}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      ></textarea>
      <input type="submit" className="btn btn-add-note" value="Add Note" />
    </form>
  );
}

export default NoteEditor;
