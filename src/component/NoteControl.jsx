import { useDispatch } from "react-redux";
import { toggleImportantOnly } from "../redux/slice/noteSlice";

function NoteControl() {
  const dispatch = useDispatch();

  function handleOnChange() {
    dispatch(toggleImportantOnly());
  }

  return (
    <div className="notes-control">
      <fieldset>
        <legend>Filter</legend>

        <div>
          <input
            type="checkbox"
            id="important-only"
            name="important-only"
            onChange={handleOnChange}
          />
          <label htmlFor="important-only">Show important only</label>
        </div>
      </fieldset>
    </div>
  );
}

export default NoteControl;
