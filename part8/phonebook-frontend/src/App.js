import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './queries/queries'
import { useState } from 'react'


const App = () => {
  const [ errorMessage, setErrorMessage ] = useState(null)

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000);
  }

  if (result.loading) {
    return(<div>loading...</div>)
  }

  const Notify = ({errorMessage}) => {
    if ( !errorMessage ) {
      return null
    }
    return (
      <div style={{color: 'red'}}>
      {errorMessage}
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={ errorMessage } />
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  )
}

export default App;
