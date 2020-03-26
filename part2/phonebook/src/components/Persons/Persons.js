import React from 'react';
import Person from './Person'

const Persons = (props) => {
  const { persons, handleDelete } = props;

  return (
    <div>
      {persons.map(person =>
        <Person
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Persons;