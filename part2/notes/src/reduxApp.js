import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Note";
import noteServices from './services/jsonNotes'
import { setNotes } from "./reducers/noteReducer";

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        noteServices.getAll().then(notes => 
            dispatch(setNotes(notes))
        )
    }, [])

    return (
        <div>
            <NewNote />

            <Notes />
        </div>
    )
}

export default App