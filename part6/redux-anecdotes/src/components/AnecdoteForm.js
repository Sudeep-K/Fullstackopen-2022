import React from 'react'
import { anecdoteToAdd } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { hideNotification, notificationChange } from '../reducers/notificationReducer'
import anecdoteServices from '../services/anecdotes'

function AnecdoteForm() {
    const dispatch = useDispatch()
    
    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteServices.createAnecdote(content)
        dispatch(anecdoteToAdd(newAnecdote))
        dispatch(notificationChange(`You added '${content}'`))
        setTimeout(() => {
          dispatch(hideNotification())
        }, 5000)
    }

  return (
    <>
        <h2>create new</h2>
        <form onSubmit={ createAnecdote }>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    </>
  )
}

export default AnecdoteForm