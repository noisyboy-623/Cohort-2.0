import { useState, useEffect } from "react";
import axios from "axios";

// import './App.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [updatedDesc, setUpdatedDesc] = useState(null)

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {

        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDelete(noteId) {
    axios.delete(`http://localhost:3000/api/notes/${noteId}`).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleUpdate(e) {
    e.preventDefault()
    console.log(e);
    
    const {updatedDesc} = e.target.elements;
    console.log(updatedDesc.value);
    axios.patch(`http://localhost:3000/api/notes/${updateId}`, {
      description: updatedDesc.value
    })
    .then(res => {
      setIsUpdating(false);   // important
      setUpdateId(null);
      setUpdatedDesc("")
      fetchNotes()
      console.log(res.data);
      
    })
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      {!isUpdating && (
        <form className="note-create-form" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Enter title" />
          <input type="text" name="description" placeholder="Enter desc" />
          <button>Create note</button>
        </form>
      )}

      {isUpdating && (
        <form className="note-update-form" onSubmit={handleUpdate}>
          <input type="text" name="updatedDesc" value={updatedDesc} onChange={(e) => setUpdatedDesc(e.target.value)} placeholder="Update desc" />
          <button>Update note</button>
        </form>
      )}
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className="action-btns">
                <button
                onClick={() => {
                  handleDelete(note._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setIsUpdating(true)
                  setUpdateId(note._id)
                  setUpdatedDesc(note.description)
                }}
              >
                Update
              </button>
              </div> 
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
