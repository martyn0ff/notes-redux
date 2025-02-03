Note.fromObject = function (object) {
  return Note(object.content, object.isImportant || false, object.id);
};

function Note(content, isImportant, id) {
  function withToggledImportance() {
    return {
      ...this,
      isImportant: !isImportant,
    };
  }

  function withContent(content) {
    return {
      ...this,
      content: content,
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
    id,
    content,
    isImportant,
    asDumbObject,
    withToggledImportance,
    withContent,
  });
}

export default Note;
