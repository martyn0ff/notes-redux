import { useDispatch } from "react-redux";
import { actions } from "../redux/noteSlice.js";

function NoteControl() {
  const dispatch = useDispatch();

  function handleOnChange() {
    dispatch(actions.toggleImportantOnly());
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
