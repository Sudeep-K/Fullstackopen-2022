import { Route, Routes, Link, Navigate, useNavigate, useParams, useMatch } from "react-router-dom"
import { useState } from "react"

const Home = () => {
    return(<div>
        <h2>TKTL notes app</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>)
}

const Note = ({ note }) => {
    return(
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
        </div>
    )
}

const Notes = ({ notes }) => {
    return(
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map((note) =>
                    <li key={ note.id }>
                        <Link to={`/notes/${note.id}`} >{note.content}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

const Users = () => {
    return(
        <div>
        <h2>TKTL notes app</h2>
        <ul>
            <li>Bhunte ki aama</li>
            <li>VZN</li>
            <li>Sacar Muji</li>
        </ul>
    </div>)
}

const Login = (props) => {
    const navigate = useNavigate()
    
    const submit = (event) => {
        event.preventDefault()
        props.inLogin('Sacar Muji')
        navigate('/')
    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={submit} >
                <div>
                    username: <input />
                </div>
                <div>
                    password: <input type='password' />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

const App = () => {

    const [user, setUser] = useState(null)
    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ])

    const match = useMatch('/notes/:id')
    const note = match ? notes.find(n => n.id === Number(match.params.id)) : null 

    const padding = {
        padding:5
    }

    const login = ( username ) => {
        setUser(username)
    }

    return (
        <>
            <div>
                <Link style={ padding } to='/'>Home</Link>
                <Link style={ padding } to='/notes'>Notes</Link>
                <Link style={ padding } to='/users'>Users</Link>
                { user ? <em>{ user } logged in</em> : <Link to='/login'> Login </Link> }
            </div>

            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/notes' element={ <Notes notes={ notes } /> } />
                <Route path='/notes/:id' element={ <Note note={ note } /> } />
                <Route path='/users' element={ user ? <Users /> : <Navigate replace to='/login' /> } />
                <Route path='/login' element={ <Login inLogin={login} /> } />
            </Routes>

            <footer>
                <i>Note app, Department of Computer Science 2022</i>
            </footer>
        </>
    )
}

export default App