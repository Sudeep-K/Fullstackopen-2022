import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const anecdoteToChange = state.find(a => a.id === action.payload)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      const unsortedAnecdote = state.map(a => a.id !== action.payload ? a : changedAnecdote)
      return unsortedAnecdote.sort((a1, a2) => (a1.votes < a2.votes) ? 1 : (a1.votes > a2.votes) ? -1 : 0)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createNewAnecdote = ( content ) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = ( anecdoteToVote ) => {
  return async dispatch => {
    console.log(anecdoteToVote)
    await anecdoteServices.updateVoteCount(anecdoteToVote)
    dispatch(vote(anecdoteToVote.id))
  }
}

export const { vote, appendAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer