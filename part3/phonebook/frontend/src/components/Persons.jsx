const Persons = ({ persons, onDeleteContact }) => {

  return (
    <div>
      {
        persons.map(person => <div key={person.id}>
          {person.name} {person.number} <button onClick={() => onDeleteContact(person)}>delete</button>
        </div>)
      }
    </div>
  )
}

export default Persons