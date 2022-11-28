import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import { vote, anecdoteToAdd, setAnecdote, appendAnecdote } from './reducers/anecdoteReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { notificationChange, hideNotification } from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    vote,
    anecdoteToAdd,
    notificationChange,
    hideNotification,
    setAnecdote,
    appendAnecdote
  }
})

console.log('store', store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
