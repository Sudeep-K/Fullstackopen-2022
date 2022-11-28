import { createSlice } from "@reduxjs/toolkit"

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
    anecdoteToAdd(state, action) {
      state.push(action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { vote, anecdoteToAdd, appendAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer