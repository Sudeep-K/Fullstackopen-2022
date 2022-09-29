import React from 'react'

const Total = (props) => {
  return (
    <p>Number of exercises {parseInt(props.exercises1) + parseInt(props.exercises2) + parseInt(props.exercises3)}</p>
  )
}

export default Total