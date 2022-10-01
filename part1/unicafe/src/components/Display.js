import React from 'react'

function Display({ text, count}) {
  return (
    <>
        <td>{text}</td>
        <td>{count}</td>
    </>
  )
}

export default Display