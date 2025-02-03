import { useDispatch } from "react-redux";
import { toggleImportance } from "../redux/slice/noteSlice";

function Note({ note }) {
  const dispatch = useDispatch();

  function handleOnClick() {
    dispatch(toggleImportance({ id: note.id }));
  }

  return (
    <li key={note.id}>
      <span
        data-id={note.id}
        className={`note ${note.isImportant ? "note-important" : ""}`}
      >
        {note.content}
      </span>

      <button className="btn btn-toggle-importance" onClick={handleOnClick}>
        toggle importance
      </button>
    </li>
  );
}

export default Note;
