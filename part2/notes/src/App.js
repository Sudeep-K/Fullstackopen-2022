import Note from "./components/Note";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log('effect');

    const eventHandler = response => {
      console.log('promise fulfilled');
      setNotes(response.data);
    }

    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler);
  }
  
  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();
    
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    setNotes([...notes, noteObject]);
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => {setShowAll(!showAll)}}> show {showAll ? 'important' : 'all'} </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
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
