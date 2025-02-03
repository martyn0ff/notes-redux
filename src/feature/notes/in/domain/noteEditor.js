NoteEditor.newEditor = function () {
  return NoteEditor("");
};

function NoteEditor(content) {
  function withContent(content) {
    return {
      ...this,
      content,
    };
  }

  function asDumbObject() {
    const dumbObject = {};
    for (const key in this) {
      if (typeof this[key] !== "function") {
        dumbObject[key] = this[key];
      }
    }
    return dumbObject;
  }

  return Object.freeze({
    content,
    asDumbObject,
    withContent,
  });
}

export default NoteEditor;
