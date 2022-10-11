import { useState } from "react";
import { useEffect } from "react";

import Display from "./components/Display";
import Form from "./components/Form";
import Filter from "./components/Filter";

import personService from './services/person';
import axios from 'axios';

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

  const updateContact = (event) => {
    event.preventDefault();

    const contact = contacts.find(c => c.name === newName);
    const updatedContact = {...contact, number: newNumber};
    console.log(updatedContact)
    axios.put(`http://localhost:3001/persons/${contact.id}`, updatedContact)
    .then(response => {
      setContacts(contacts.map(c => c.id !== updatedContact.id ? c : response.data))
    })
  }

  const checkValidity = (event) => {
    event.preventDefault();

    const sameContact = contacts.filter((contact) => contact.name === newName);
    // sameContact.length > 0 ? alert(`${newName} is already added to the phonebook`) : addContact(event);
    if (sameContact.length > 0) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with new one`)) {
        updateContact(event);
      } else {
        alert(`❌${newName} was not updated to the phonebook`);
      }
    } else {
      addContact(event);
    }
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

  const deleteContactOf = (id) => {
    if (window.confirm('Do you want to delete contact id', id)) {
      personService.deletecontact(id)
      .then(response => {
        setContacts(contacts.filter(c => c.id !== id))
      })
      .catch(error => {
        console.log('error deleting contact');
      })
      alert('✅contact deleted');
    } else {
     alert('❌contact not deleted'); 
    }
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
                                    contact={contact}
                                    deleteContact={deleteContactOf}
                                  />
                    )
      }
    </>
  );
}

export default App;
