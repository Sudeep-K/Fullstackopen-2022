import { useState } from "react";
import Display from "./components/Display";
import Form from "./components/Form";
import Filter from "./components/Filter";

function App() {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

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

    setContacts([...contacts, tempContact]);
    setNewName('');
    setNewNumber('');
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
