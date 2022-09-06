const noteId = location.hash.substr(1);
const notes = savedNotes();

document.querySelector("#note-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const time = moment().valueOf();

  notes.push({
    id: noteId,
    title: e.target.title.value,
    body: e.target.cardBody.value,
    createdAt: time,
    updatedAt: time,
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  location.assign("/index.html");
});
