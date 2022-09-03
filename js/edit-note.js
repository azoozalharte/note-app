const noteId = location.hash.substr(1);
const notes = savedNotes();

const noteIndex = notes.findIndex((note) => note.id === noteId);

// fill forms with data
document.querySelector("input").value = notes[noteIndex].title;
document.querySelector("textarea").value = notes[noteIndex].body;

document.querySelector("#edit-form").addEventListener("submit", function (e) {
  e.preventDefault();
  removeNote(noteId);

  notes.splice(noteIndex, 0, {
    id: noteId,
    title: e.target.title.value,
    body: e.target.cardBody.value,
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  location.assign("/index.html");
});
