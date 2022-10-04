import { useState } from "react";
import Display from "./components/Display";

function App() {
  const [contacts, setContacts] = useState([
    {id: 1, name: 'Arto Hellas'},
    {id: 2, name: 'Ada Lovelace'},
  ])
  const [newName, setNewName] = useState('');

  const checkValidity = (event) => {
    const sameContact = contacts.filter((contact) => contact.name === newName);
    sameContact.length > 0 ? alert(`${newName} is already added to the phonebook`) : addContact(event);
  }

  const addContact = (event) => {
    event.preventDefault();

    const tempContact = {
      id: contacts.length + 1,
      name: newName,
    }

    setContacts([...contacts, tempContact]);
    setNewName('');
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={checkValidity}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contacts.map((contact) => <Display key={contact.id} name={contact.name} />)}
    </>
  );
}

export default App;
