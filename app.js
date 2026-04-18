let editIndex = -1;

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes(filteredNotes = null) {
  const notes = filteredNotes || getNotes();
  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <p>${note}</p>
      <button onclick="editNote(${index})">Edit</button>
      <button onclick="deleteNote(${index})">Delete</button>
    `;

    container.appendChild(div);
  });
}

function addNote() {
  const input = document.getElementById("noteInput");
  const notes = getNotes();

  if (input.value.trim() === "") {
    alert("Note cannot be empty");
    return;
  }

  if (editIndex === -1) {
    notes.push(input.value);
  } else {
    notes[editIndex] = input.value;
    editIndex = -1;
  }

  saveNotes(notes);
  input.value = "";

  renderNotes();
}

function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  renderNotes();
}

function editNote(index) {
  const notes = getNotes();
  document.getElementById("noteInput").value = notes[index];
  editIndex = index;
}

function searchNotes() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const notes = getNotes();

  const filtered = notes.filter(note =>
    note.toLowerCase().includes(query)
  );

  renderNotes(filtered);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

renderNotes();
