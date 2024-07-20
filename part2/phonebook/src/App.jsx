import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import { useEffect } from 'react'
import { addContact, deleteContact, getContacts, updateContacts } from './services/contact'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [message, setMessage] = useState({ type: "success", text: "" })

  const onHandleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const addPerson = (newPerson, clearFormCallback) => {
    const personIdx = persons.findIndex(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
    if (personIdx > 0) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const newList = [...persons];

        updateContacts(newList[personIdx].id, newPerson).then(() => {
          setMessage({ type: "success", text: `Updated ${newPerson.name}` })

          newList[personIdx] = newPerson
          setPersons(newList)
          clearFormCallback()
        }).catch(() => {
          setMessage({ type: "error", text: `Cannot update ${newPerson.name}` })
        }).finally(() => {
          setTimeout(() => setMessage({ type: "success", text: "" }), 3000)
        })
      }
      return
    }

    addContact(newPerson).then(response => {
      setMessage({ type: "success", text: `Added ${newPerson.name}` })

      setPersons(persons.concat(response))
      clearFormCallback()
    }).catch(() => {
      setMessage({ type: "error", text: `Cannot add ${newPerson.name}` })
    }).finally(() => {
      setTimeout(() => setMessage({ type: "success", text: "" }), 3000)
    })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      deleteContact(person.id).then((response) => {
        setMessage({ type: "success", text: `Deleted ${person.name}` })

        setPersons(persons.filter(person => person.id !== response.id))
      }).catch(() => {
        setMessage({ type: "error", text: `Information of ${person.name} has already been removed from server` })
      }).finally(() => {
        setTimeout(() => setMessage({ type: "success", text: "" }), 3000)
      })
    }
  }

  useEffect(() => {
    getContacts().then(response => setPersons(response))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification type={message.type} message={message.text} />

      <Filter onHandleSearch={onHandleSearch} searchValue={searchValue} />

      <h3>Add a new</h3>
      <PersonForm onSaveNewContact={addPerson} />

      <h3>Numbers</h3>
      {persons ?
        <Persons
          persons={persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))}
          onDeleteContact={deletePerson}
        />
        :
        <i>Loading persons</i>
      }
    </div>
  )
}

export default App