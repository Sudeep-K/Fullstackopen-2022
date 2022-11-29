import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Note";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeNotes())
    }, [])

    return (
        <div>
            <NewNote />

            <Notes />
        </div>
    )
}

export default App