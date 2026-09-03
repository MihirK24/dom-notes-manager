import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const notesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const notesContainer = notesContainerRef.current;
    const input = inputRef.current;
    const addButton = document.getElementById("addNoteBtn");
    const countElement = countRef.current;
    const emptyMessage = document.querySelector(".empty-message");

    let notes = [];

    function updateCount() {
      countElement.textContent = `Total Notes: ${notes.length}`;
    }

    function createNoteElement(note) {
      const noteCard = document.createElement("div");
      noteCard.className = "note-card";

      if (note.important) {
        noteCard.classList.add("important");
      }

      const noteText = document.createElement("p");
      noteText.className = "note-text";
      noteText.textContent = note.text;

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";

      const importantButton = document.createElement("button");
      importantButton.textContent = note.important
        ? "★ Important"
        : "☆ Important";

      importantButton.className = "important-btn";

      importantButton.addEventListener("click", () => {
        note.important = !note.important;

        noteCard.classList.toggle("important");

        importantButton.textContent = note.important
          ? "★ Important"
          : "☆ Important";
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit-btn";

      editButton.addEventListener("click", () => {
        const updatedText = prompt("Edit your note:", note.text);

        if (updatedText !== null && updatedText.trim() !== "") {
          note.text = updatedText.trim();
          noteText.textContent = note.text;
        }
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-btn";

      deleteButton.addEventListener("click", () => {
        notes = notes.filter((item) => item.id !== note.id);

        noteCard.remove();

        if (notes.length === 0) {
          emptyMessage.style.display = "block";
        }

        updateCount();
      });

      buttonContainer.appendChild(importantButton);
      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(deleteButton);

      noteCard.appendChild(noteText);
      noteCard.appendChild(buttonContainer);

      return noteCard;
    }

    function addNote() {
      const text = input.value.trim();

      if (text === "") {
        alert("Please enter a note.");
        return;
      }

      const newNote = {
        id: Date.now(),
        text: text,
        important: false,
      };

      notes.push(newNote);

      const noteElement = createNoteElement(newNote);

      notesContainer.appendChild(noteElement);

      emptyMessage.style.display = "none";

      input.value = "";

      updateCount();

      input.focus();
    }

    addButton.addEventListener("click", addNote);

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        addNote();
      }
    });

    updateCount();

    return () => {
      addButton.removeEventListener("click", addNote);
    };
  }, []);

  return (
    <div className="app">
      <div className="notes-manager">
        <header className="header">
          <h1>📝 Notes Manager</h1>
          <p>DOM-Based Notes Manager</p>
        </header>

        <div className="input-section">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter your note here..."
            id="noteInput"
          />

          <button id="addNoteBtn" className="add-btn">
            Add Note
          </button>
        </div>

        <div className="notes-info">
          <h2 ref={countRef}>Total Notes: 0</h2>
        </div>

        <div
          ref={notesContainerRef}
          id="notesContainer"
          className="notes-container"
        ></div>

        <div className="empty-message">
          <p>Add a note to get started.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
