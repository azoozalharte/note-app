"use strict";

const notes = savedNotes();
const filters = {
  searchFillter: "",
  sortBy: "",
};
render(notes, filters);

// Button
document.querySelector("#add-note").addEventListener("click", (e) => {
  const id = uuidv4();
  location.assign(`/create.html#${id}`);
});

// Input
document.querySelector("#fillter-notes").addEventListener("input", (e) => {
  filters.searchFillter = e.target.value;
  render(notes, filters);
});

//filter by something
document.querySelector("#filter-by").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  render(notes, filters);
});
