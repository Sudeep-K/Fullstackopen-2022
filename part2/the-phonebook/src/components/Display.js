import React from 'react'

function Display({ contact, deleteContact }) {
  return (
    <ul>
        <li> {contact.name} {contact.number} <button onClick={() => deleteContact(contact.id)}>delete</button></li>
    </ul>
  )
}

export default Display