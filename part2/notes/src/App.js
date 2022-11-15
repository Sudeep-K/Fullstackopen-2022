import Note from "./components/Note";
import { useState, useEffect, useRef } from "react";

import noteServices from './services/notes'
import loginService from './services/login'

import Notification from "./components/Notification"
import Login from "./components/Login"
import AddNote from "./components/AddNote"
import Togglable from "./components/Togglable"

function App() {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('Some error occured...');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const noteFormRef = useRef()

  useEffect(() => {
    const eventHandler = initialNotes => {
      setNotes(initialNotes);
    }
  
    const promise = noteServices.getAll()
    promise.then(eventHandler);
  }, []);

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

  const addNote = ( noteObject ) => {
    noteFormRef.current.toggleVisibility()
    noteServices
    .create(noteObject)
    .then(returnedNote => {
      setNotes([...notes, returnedNote]);
    })
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

  const loginForm = () => {
    return(
      <Togglable buttonLabel='login'>
        <Login
          username={ username }
          setUsername={ setUsername }
          password={ password }
          setPassword={ setPassword }
          handleLogin={ handleLogin }
        />
      </Togglable>
    )
  }

  const noteForm = () => {
    return (
      <Togglable buttonLabel='new note' ref={ noteFormRef }>
        <AddNote 
          createNote={ addNote }
        />
      </Togglable>
    )
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
