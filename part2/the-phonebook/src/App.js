import { useState } from "react";
import { useEffect } from "react";

import Display from "./components/Display";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import personService from './services/person';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState('something something went wrong....');

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
    axios.put(`http://localhost:3001/persons/${contact.id}`, updatedContact)
    .then(response => {
      setContacts(contacts.map(c => c.id !== updatedContact.id ? c : response.data))
      setNotificationMsg(`${updatedContact.name}'s contact was updated to ${updatedContact.number}`);
      setTimeout(() => {
        setNotificationMsg(null);
      }, 3000);
    })
  }

  const checkValidity = (event) => {
    event.preventDefault();

    const sameContact = contacts.filter((contact) => contact.name === newName);
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
      setNotificationMsg(`${tempContact.name}'s contact was added to the server`);
      setTimeout(() => {
        setNotificationMsg(null);
      }, 3000);
      setNewName('');
      setNewNumber('');
    })
  }

  const deleteContactOf = (id) => {
    if (window.confirm('Do you want to delete contact id', id)) {
      personService.deletecontact(id)
      .then(response => {
        setContacts(contacts.filter(c => c.id !== id));
        setNotificationMsg(`Information of contact id ${id} has been removed from the server`);
      setTimeout(() => {
        setNotificationMsg(null);
      }, 3000);
      })
      .catch(error => {
        setNotificationMsg(`Information of contact id ${id} had already been removed from the server`);
      setTimeout(() => {
        setNotificationMsg(null);
      }, 3000);
      })
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
      <Notification message={notificationMsg} />
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
