// This is what is also referred to "smart component" or
// "container component"
import NoteList from "./NoteList.jsx";
import NoteEditor from "./NoteEditor.jsx";
import "../assets/style/style.css";
import NoteControl from "./NoteControl.jsx";

function NotesContainer() {
  return (
    <div className="notes-container">
      <NoteEditor />
      <NoteControl />
      <NoteList />
    </div>
  );
}

export default NotesContainer;
