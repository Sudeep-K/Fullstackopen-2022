import React from 'react'
import { useState } from 'react'

function AddNote({ createNote }) {
    const [newNote, setNewNote] = useState('a new note...');

    const addNote = (event) => {
        event.preventDefault()

        createNote({
            content: newNote,
            important: Math.random() > 0.5
        })

        setNewNote('')
    }

  return (
    <form onSubmit={addNote}>
        <input value={newNote} onChange={ (e) => setNewNote(e.target.value) }/>
        <button type='submit'>save</button>
    </form>
  )
}

export default AddNote