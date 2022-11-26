const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

export const anecdoteToAdd = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId,
      votes: 0
    }
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case('VOTE'): {
      const anecdoteToChange = state.find(a => a.id === action.id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      const unsortedAnecdote = state.map(a => a.id !== action.id ? a : changedAnecdote)
      state = unsortedAnecdote.sort((a1, a2) => (a1.votes < a2.votes) ? 1 : (a1.votes > a2.votes) ? -1 : 0)
      return state
    }
    case('NEW_ANECDOTE'): {
      return [ ...state, action.data ]
    }
    default:
      return state
  }
}

export default reducer