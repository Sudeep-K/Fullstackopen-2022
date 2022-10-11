import { useState } from "react";
import { useEffect } from "react";

import Display from "./components/Display";
import Form from "./components/Form";
import Filter from "./components/Filter";

import personService from './services/person';

function App() {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  const hook = () => {
    const eventHandler = (initialContact) => {
      setContacts(initialContact);
    }

    const promise = personService.getAll();
    promise.then(eventHandler);
  }

  useEffect(hook, []);

  const filterContacts = (event) => {
    setFilterInput(event.target.value);

    const regex = new RegExp(`${filterInput}`, 'gi');
    const tempContacts = contacts.filter((contact) => regex.test(contact.name));
    filterInput === '' ? setFilteredContacts(contacts) : setFilteredContacts(tempContacts)
  }

  const checkValidity = (event) => {
    event.preventDefault();

    const sameContact = contacts.filter((contact) => contact.name === newName);
    sameContact.length > 0 ? alert(`${newName} is already added to the phonebook`) : addContact(event);
  }

  const addContact = (event) => {
    event.preventDefault();

    const tempContact = {
      id: contacts.length + 1,
      name: newName,
      number: newNumber
    }

    personService.create(tempContact)
    .then(returnedContacts => {
      setContacts([...contacts, returnedContacts]);
      setNewName('');
      setNewNumber('');
    })

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter
        onChange={filterContacts}
        filterInput={filterInput}
        filteredContacts={filteredContacts} 
      />

      <h2>add a new</h2>
      <Form 
        onSubmit={checkValidity} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newName={newName} 
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      {contacts.map((contact) => 
                                  <Display 
                                    key={contact.id}
                                    name={contact.name} 
                                    number={contact.number} 
                                  />
                    )
      }
    </>
  );
}

export default App;
