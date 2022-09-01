const notes = savedNotes();

render(notes, filters);

// Button
document.querySelector("#add-note").addEventListener("click", function (e) {
  const id = uuidv4();
  location.assign(`/create.html#${id}`);
});

// Input
document
  .querySelector("#fillter-notes")
  .addEventListener("input", function (e) {
    filters.searchFillter = e.target.value;
    render(notes, filters);
  });
