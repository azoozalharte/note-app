const noteId = location.hash.substr(1);
const notes = savedNotes();

const note = notes.filter((note) => {
  return note.id === noteId;
});

// fill forms with data
document.querySelector("input").value = note[0].title;
document.querySelector("textarea").value = note[0].body;

document.querySelector("#edit-form").addEventListener("submit", function (e) {
  e.preventDefault();
  removeNote(noteId);
  note[0].title = e.target.title.value;
  note[0].body = e.target.cardBody.value;
  notes.push(note[0]);
  localStorage.setItem("notes", JSON.stringify(notes));
  location.assign("/index.html");
});
