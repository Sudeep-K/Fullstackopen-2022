import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, hideNotification } from '../reducers/notificationReducer'

function AnecdoteList() {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const handleLikes = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(notificationChange(`You voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }

  return (
    <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={ () => handleLikes(anecdote) }>vote</button>
            </div>
            </div>
        )}
    </>
  )
}

export default AnecdoteList