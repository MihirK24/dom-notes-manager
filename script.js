// Get required HTML elements
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");
const emptyMessage = document.getElementById("emptyMessage");

// Store notes
let notes = [];

// Update total note count
function updateNoteCount() {
    noteCount.textContent = `Total Notes: ${notes.length}`;
}

// Create and display a note dynamically
function createNote(note) {

    // Create main note card
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";

    // Create note text
    const noteText = document.createElement("p");
    noteText.className = "note-text";
    noteText.textContent = note.text;

    // Create button container
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "note-buttons";

    // Create Important button
    const importantButton = document.createElement("button");
    importantButton.className = "important-btn";

    importantButton.textContent = note.important
        ? "★ Important"
        : "☆ Important";

    // Important button event
    importantButton.addEventListener("click", function () {

        note.important = !note.important;

        noteCard.classList.toggle("important");

        importantButton.textContent = note.important
            ? "★ Important"
            : "☆ Important";
    });

    // Create Edit button
    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";

    // Edit button event
    editButton.addEventListener("click", function () {

        const updatedText = prompt(
            "Edit your note:",
            note.text
        );

        if (
            updatedText !== null &&
            updatedText.trim() !== ""
        ) {

            note.text = updatedText.trim();

            noteText.textContent = note.text;
        }
    });

    // Create Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    // Delete button event
    deleteButton.addEventListener("click", function () {

        notes = notes.filter(function (item) {
            return item.id !== note.id;
        });

        noteCard.remove();

        updateNoteCount();

        if (notes.length === 0) {
            emptyMessage.style.display = "block";
        }
    });

    // Add buttons to button container
    buttonContainer.appendChild(importantButton);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Add elements to note card
    noteCard.appendChild(noteText);
    noteCard.appendChild(buttonContainer);

    // Add note card to webpage
    notesContainer.appendChild(noteCard);
}

// Add Note button event
addNoteBtn.addEventListener("click", function () {

    const noteText = noteInput.value.trim();

    // Check for empty input
    if (noteText === "") {
        alert("Please enter a note.");
        return;
    }

    // Create new note object
    const newNote = {
        id: Date.now(),
        text: noteText,
        important: false
    };

    // Add note to array
    notes.push(newNote);

    // Create note dynamically
    createNote(newNote);

    // Clear input field
    noteInput.value = "";

    // Update note count
    updateNoteCount();

    // Hide empty message
    emptyMessage.style.display = "none";

    // Put cursor back in input
    noteInput.focus();
});

// Allow Enter key to add note
noteInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addNoteBtn.click();
    }
});

// Initial count
updateNoteCount();