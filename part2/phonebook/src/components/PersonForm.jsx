import { useState } from "react"

const PersonForm = ({ onSaveNewContact }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onHandleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const onHandleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onSubmitForm = (event) => {
    event.preventDefault();

    onSaveNewContact(
      {
        name: newName,
        number: newNumber
      },
      () => {
        setNewName('');
        setNewNumber('')
      }
    )
  }

  return (
    <form>
      <div>
        name:  <input value={newName} onChange={onHandleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onHandleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onSubmitForm}>add</button>
      </div>
    </form>
  )
}

export default PersonForm