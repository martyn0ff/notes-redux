import axios from "axios";
import config from "../../../../../config.js";

const axiosInstance = axios.create({
  baseURL: config.DATABASE_BASE_URI,
});

// Singleton feels like a perversion,
// but should do for now lol
const noteDatabaseClient = NoteDatabaseClient();

function NoteDatabaseClient() {
  async function getAll() {
    const response = await axiosInstance.get("/notes");
    // const response = await axiosInstance.get("/404");
    return response;
  }

  async function save(note) {
    return await axiosInstance.post("/notes", note);
  }

  async function setImportant(id, isImportant) {
    return await axiosInstance.patch(`/notes/${id}`, {
      isImportant: isImportant,
    });
  }

  async function remove(id) {
    return await axiosInstance.delete(`/notes/${id}`);
  }

  return {
    getAll,
    save,
    setImportant,
    remove,
  };
}

export default noteDatabaseClient;
