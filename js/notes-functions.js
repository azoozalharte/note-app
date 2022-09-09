// get saved notes from localStroage

const savedNotes = () => {
  // check if localStroge has notes
  const noteJSON = localStorage.getItem("notes");
  if (noteJSON != null) {
    return JSON.parse(noteJSON);
  } else {
    return [];
  }
};

const notesFilter = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((note1, note2) => {
      if (note1.updatedAt > note2.updatedAt) {
        return -1;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((note1, note2) => {
      if (note1.createdAt > note2.createdAt) {
        return -1;
      } else if (note1.createdAt < note2.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes.sort((note1, note2) => {
      if (note1.createdAt < note2.createdAt) {
        return -1;
      }
    });
  }
};

// render
const render = (notes, filters) => {
  notes = notesFilter(notes, filters.sortBy);
  console.log(notes);
  const renderdNotes = notes.filter((note) => {
    return note.title
      .toLowerCase()
      .includes(filters.searchFillter.toLowerCase());
  });

  document.querySelector("#notes").innerHTML = "";

  renderdNotes.forEach((note) => {
    const notes = renderNotesDOM(note);
    document.querySelector("#notes").appendChild(notes);
  });
};

// reander DOM

const renderNotesDOM = (note) => {
  // card
  const card = document.createElement("div");
  card.classList.add("card");
  // title
  const noteTitle = document.createElement("p");
  noteTitle.classList.add("title");

  // card body
  const noteBody = document.createElement("p");
  noteBody.classList.add("card-body");

  //delete Icon
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");

  //delete Icon
  const deleteIcon = document.createElement("ion-icon");
  deleteIcon.setAttribute("name", "trash-outline");
  deleteIcon.classList.add("delete-icon");

  deleteButton.appendChild(deleteIcon);

  deleteButton.addEventListener("click", () => {
    if (confirm("من جدك تبغا تحذفها؟")) {
      removeNote(note.id);
      localStorage.setItem("notes", JSON.stringify(notes));
      render(notes, filters);
    }
  });

  //Edit Ancor
  const editButton = document.createElement("a");
  editButton.setAttribute("href", `edit.html#${note.id}`);
  editButton.classList.add("edit-page");

  //Edit Icon
  const editIcon = document.createElement("ion-icon");
  editIcon.setAttribute("name", "create-outline");
  editIcon.classList.add("edit-icon");

  editButton.appendChild(editIcon);

  // <ion-icon name="trash-outline" class="delete-icon"></ion-icon>

  if (note.title.trim().length > 0) {
    noteTitle.textContent = note.title;
  } else {
    noteTitle.textContent = "مذكرة فارغه";
  }

  if (note.body.trim().length > 0) {
    noteBody.textContent = note.body;
  } else {
    noteBody.textContent =
      "ترى المفروض تكتب مذكراتك هنا ما تخليها فاضيه الله يهديك";
  }

  card.appendChild(noteTitle);
  card.appendChild(noteBody);
  card.appendChild(deleteButton);
  card.appendChild(editButton);

  return card;
};

// remove Note

const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  } else {
    console.log(noteIndex);
  }
};
