import React from 'react'

const Total = (props) => {
  return (
    <p>Number of exercises {parseInt(props.parts[0].exercises) + parseInt(props.parts[1].exercises) + parseInt(props.parts[2].exercises)}</p>
  )
}

export default Total