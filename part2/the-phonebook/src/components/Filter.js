import React from 'react'
import Display from './Display'

function Filter({ filterInput, onChange, filteredContacts }) {
  return (
    <div>
        filter shown with <input value={filterInput} onChange={onChange}/>
        {filteredContacts.map((contact) => 
                                  <Display 
                                    key={contact.id}
                                    name={contact.name} 
                                    number={contact.number} 
                                  />
                    )
      }
    </div>
  )
}

export default Filter