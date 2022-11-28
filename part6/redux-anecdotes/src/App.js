import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { appendAnecdote } from './reducers/anecdoteReducer'
import anecdoteSevices from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteSevices.getAll()
    .then((anecdotes) => {
      anecdotes.forEach((a) => dispatch(appendAnecdote(a)))
    })
  }, [])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList /> 
    </div>
  )
}

export default App