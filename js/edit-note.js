moment.locale("ar_SA");
const noteId = location.hash.substr(1);
const notes = savedNotes();

const noteIndex = notes.findIndex((note) => note.id === noteId);
const createdAt = notes[noteIndex].createdAt;

if (notes[noteIndex].createdAt != notes[noteIndex].updatedAt) {
  document.querySelector(".edited").innerHTML = `تم تعديل المذكرة ${moment(
    notes[noteIndex].updatedAt
  ).fromNow()}`;
}

// fill forms with data
document.querySelector("input").value = notes[noteIndex].title;
document.querySelector("textarea").value = notes[noteIndex].body;

document.querySelector("#edit-form").addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    e.target.title.value != notes[noteIndex].title ||
    e.target.cardBody.value != notes[noteIndex].body
  ) {
    removeNote(noteId);

    notes.splice(noteIndex, 0, {
      id: noteId,
      title: e.target.title.value,
      body: e.target.cardBody.value,
      createdAt: createdAt,
      updatedAt: moment().valueOf(),
    });
    localStorage.setItem("notes", JSON.stringify(notes));
    location.assign("/index.html");
  } else if (confirm("لا يوجد تعديل هل تريد الرجوع للصفحه الرئيسة؟")) {
    location.assign("/index.html");
  }
});
