import React from 'react'

function Notification({ message, error }) {
    if (!message) {
        return null
    }
    if (error) {
      return <div className='error'> {message} </div>
    }
  return (
    <div className='notification'>{ message }</div>
  )
}

export default Notification