const noteId = location.hash.substr(1);
const notes = savedNotes();

document.querySelector("#note-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const timeStamp = moment().valueOf();

  notes.push({
    id: noteId,
    title: e.target.title.value,
    body: e.target.cardBody.value,
    createdAt: timeStamp,
    updatedAt: timeStamp,
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  location.assign("/index.html");
});
