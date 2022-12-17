import React from 'react'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { FIND_PERSON } from '../queries/queries'


const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

const Persons = ({ persons }) => {
  const [ name, setName ] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: { name },
    skip: !name
  })

  if ( name && result.data ) {
    return (
      <Person
        person={ result.data.findPerson }
        onClose={ () => setName(null) }
      />
    )
  }

  return (
    <div>
        <h2>Persons</h2>
        {persons.map(p => 
            <div key={p.name}>
                {p.name} {p.phone}
                <button onClick={ () => setName(p.name) }>
                  show address
                </button>
            </div>
            )}
    </div>
  )
}

export default Persons