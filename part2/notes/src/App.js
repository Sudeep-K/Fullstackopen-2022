import Note from "./components/Note";
import { useState } from "react";
import { useEffect } from "react";

import noteServices from './services/notes'

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log('effect');

    const eventHandler = initialNotes => {
      setNotes(initialNotes);
    }

    const promise = noteServices.getAll()
    promise.then(eventHandler);
  }
  
  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();
    
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    noteServices.create(noteObject)
    .then(returnedNote => {
      setNotes([...notes, returnedNote]);
      setNewNote('');
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toogleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};

    noteServices.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
    .catch(error => {
      alert(`the note ${note.content} was already deleted from the server`);
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => {setShowAll(!showAll)}}> show {showAll ? 'important' : 'all'} </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={toogleImportanceOf}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
  </div>
  );
}

export default App;
