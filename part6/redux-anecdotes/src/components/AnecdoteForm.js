import React from 'react'
import { anecdoteToAdd } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { hideNotification, notificationChange } from '../reducers/notificationReducer'

function AnecdoteForm() {
    const dispatch = useDispatch()
    
    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(anecdoteToAdd(content))
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