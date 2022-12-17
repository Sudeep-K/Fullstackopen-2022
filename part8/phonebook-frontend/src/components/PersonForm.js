import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_PERSON } from '../queries/queries'
import { ALL_PERSONS } from '../queries/queries'


function PersonForm({ setError }) {
    const [ name, setName ] = useState('')
    const [ city, setCity ] = useState('')
    const [ street, setStreet ] = useState('')
    const [ phone, setPhone ] = useState('')

    const [ createPerson ] = useMutation(CREATE_PERSON,{
        refetchQueries: [  {query: ALL_PERSONS } ],
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    const submit = (e) => {
        e.preventDefault()
        createPerson({ variables:{ name, city, street, phone } })

        setName('')
        setCity('')
        setStreet('')
        setPhone('')
    }

  return (
    <div>
        <h2>Create</h2>
        <form onSubmit={submit}>
            <div>
                name: <input
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />
            </div>
            <div>
                city: <input
                        value={ city }
                        onChange={ (e) => setCity(e.target.value) }
                    />
            </div>
            <div>
                street: <input
                        value={ street }
                        onChange={ (e) => setStreet(e.target.value) }
                    />
            </div>
            <div>
                phone: <input
                        value={ phone }
                        onChange={ (e) => setPhone(e.target.value) }
                    />
            </div>
            <button type='submit'>add!</button>
        </form>
    </div>
  )
}

export default PersonForm