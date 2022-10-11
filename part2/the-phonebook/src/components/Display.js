import React from 'react'

function Display({ contact, deleteContact }) {
  return (
    <>
        <div> {contact.name} {contact.number} <button onClick={() => deleteContact(contact.id)}>delete</button></div>
    </>
  )
}

export default Display