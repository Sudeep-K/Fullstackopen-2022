import Note from "./components/Note";
import { useState } from "react";
import { useEffect } from "react";

import noteServices from './services/notes'
import loginService from './services/login'
import Notification from "./components/Notification";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('Some error occured...');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const hook = () => {
    console.log('effect');

    const eventHandler = initialNotes => {
      setNotes(initialNotes);
    }

    const promise = noteServices.getAll()
    promise.then(eventHandler);
  }
  
  useEffect(hook, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteServices.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return <form onSubmit={handleLogin} className='login-form'>
        <div>
          username 
          <input 
            type='text'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          /> 
        </div>

        <button type="submit">login</button>
    </form>
  }

  const noteForm = () => {
    return <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
    </form>
  }

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

    noteServices.update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
    .catch(error => {
      setErrorMessage(`${note.content} was already removed from the server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNotes(notes.filter(n => n.id !== id));
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => {setShowAll(!showAll)}}> show {showAll ? 'important' : 'all'} </button>
      </div>
      <Notification message={ errorMessage } />

      { user === null ?
        loginForm() : 
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      }

      <ul className="notes">
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={toogleImportanceOf}/>
        )}
      </ul>
      
  </div>
  );
}

export default App;
