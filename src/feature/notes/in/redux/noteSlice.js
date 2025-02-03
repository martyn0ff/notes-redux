import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Note from "../domain/note.js";
import NoteEditor from "../domain/noteEditor.js";
import noteDatabaseClient from "../../out/db/noteDatabaseClient.js";
import LoadingStatus from "../../../../common/domain/loadingStatus.js";
import SimpleResponse from "../../../../common/domain/simpleResponse.js";

//
// Selectors
//

const selectors = {
  selectAllNotes,
  selectIsImportantOnly,
  selectNotesStatus,
  selectNotesError,
};

function selectAllNotes(state) {
  return state.notesSlice.notes;
}

function selectIsImportantOnly(state) {
  return state.notesSlice.importantOnly;
}

function selectNotesStatus(state) {
  return state.notesSlice.status;
}

function selectNotesError(state) {
  return state.notesSlice.error;
}

//
// Thunks
//

const thunks = {
  // Fetch notes
  fetchNotes: createAsyncThunk(
    "notes/fetchNotes",
    async (payload, thunkAPI) => {
      try {
        const response = await noteDatabaseClient.getAll();
        return SimpleResponse.from2xxResponse(response);
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          return thunkAPI.rejectWithValue(SimpleResponse.fromError(error));
        }
        const errorResponse = error;
        return thunkAPI.rejectWithValue(
          SimpleResponse.fromFailedResponse(errorResponse),
        );
      }
    },
  ),

  // Add note
  addNote: createAsyncThunk("notes/addNote", async (payload, thunkAPI) => {
    try {
      const note = payload;
      const response = await noteDatabaseClient.save(note);
      return SimpleResponse.from2xxResponse(response);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return thunkAPI.rejectWithValue(SimpleResponse.fromError(error));
      }
      const errorResponse = error;
      return thunkAPI.rejectWithValue(
        SimpleResponse.fromFailedResponse(errorResponse),
      );
    }
  }),

  // Toggle note importance
  setImportant: createAsyncThunk(
    "notes/setImportant",
    async (payload, thunkAPI) => {
      try {
        const { id, isImportant } = payload;
        const updateResponse = await noteDatabaseClient.setImportant(
          id,
          isImportant,
        );
        return SimpleResponse.from2xxResponse(updateResponse);
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          return thunkAPI.rejectWithValue(SimpleResponse.fromError(error));
        }
        const errorResponse = error;
        return thunkAPI.rejectWithValue(
          SimpleResponse.fromFailedResponse(errorResponse),
        );
      }
    },
  ),

  deleteNote: createAsyncThunk(
    "notes/deleteNote",
    async (payload, thunkAPI) => {
      try {
        const { id } = payload;
        const deleteResponse = await noteDatabaseClient.remove(id);
        return SimpleResponse.from2xxResponse(deleteResponse);
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          return thunkAPI.rejectWithValue(SimpleResponse.fromError(error));
        }
        const errorResponse = error;
        return thunkAPI.rejectWithValue(
          SimpleResponse.fromFailedResponse(errorResponse),
        );
      }
    },
  ),
};

//
// Slice
//

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    // later we can do something like:
    // filters: [importantOnly, matchingSearch] ...
    importantOnly: false,
    notes: [],
    noteEditor: NoteEditor.newEditor().asDumbObject(),
    status: LoadingStatus.IDLE,
    error: undefined,
  },
  // Even though it appears that we simply  mutate state,
  // Immer under the hood actually returns new state every time
  // we access a setter
  reducers: {
    updateNoteEditor: (state, action) => {
      state.noteEditor = action.payload;
    },
    toggleImportantOnly: (state) => {
      state.importantOnly = !state.importantOnly;
    },
  },

  // Extra reducers are reducers that are not part of the slice itself.
  // They are typically used for handling async actions (like thunks),
  // or for actions dispatched by other slices that affect the current slice.
  extraReducers(builder) {
    builder
      // in case you forget: fetchNotes are a Promise-like object

      // fetchNotes
      .addCase(thunks.fetchNotes.rejected, (state, action) => {
        state.status = LoadingStatus.ERROR;
        const response = action.payload;
        if (response.details.message === "Network Error") {
          state.error = "Network Error";
        } else {
          state.error = `Unexpected HTTP status: ${response.status}`;
        }
      })
      .addCase(thunks.fetchNotes.pending, (state, action) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(thunks.fetchNotes.fulfilled, (state, action) => {
        state.status = LoadingStatus.COMPLETE;
        state.notes = action.payload.data.map((note) =>
          Note.fromObject(note).asDumbObject(),
        );
      })

      // addNote
      .addCase(thunks.addNote.fulfilled, (state, action) => {
        const note = action.payload.data;
        // Remember, Immer would return a new array
        state.notes.push(note);
      })

      .addCase(thunks.deleteNote.fulfilled, (state, action) => {
        const deletedNoteId = action.payload.data.id;
        state.notes = state.notes.filter((note) => note.id !== deletedNoteId);
      });
  },
});

// Important: I tried to have reducers in a separate object, and then
// export that. It does not work, because Redux wraps these functions
// into an action object under the hood.
const actions = noteSlice.actions;

export { selectors, thunks, actions };
export default noteSlice.reducer;
