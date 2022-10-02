import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

function Course({ name, parts}) {
  return (
    <>
        <Header text={name} />
        <Content parts={parts} />
        <Total parts={parts} />
    </>
  )
}

export default Course