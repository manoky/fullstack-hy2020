import React, { useState, useEffect } from 'react'
import Persons from './Persons/Persons'
import PersonForm from './Persons/PersonForm'
import Filter from './FIlter'
import personService from './services/persons'
import Notification from './notification/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filtervalue, setFilterValue] = useState('')
  const [message, setMessage] = useState(null)
  const [noticeType, setNoticeType] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(data => {
      setPersons(data)
    })

  },[])

  const handleSetName = (e) => {
    setNewName(e.target.value)
  }

  const handleSetNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExist = persons.find(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    )
    
    if (personExist) {

      if(window.confirm(
        `${newName}is already added to phonebook, replace the older number with the new one?`)
      ) {

        const updatePerson = {...personExist, number: newNumber}
        const id = personExist.id

        personService
          .update(id, updatePerson)
          .then(data => {
            setPersons(
              persons.map(person => person.id !== id ? person :data)
            )
            setMessage(`Then number for ${updatePerson.name} has been updated`)
            setNoticeType('success')
          })
          .catch(error => {
            setMessage(`Then replacing the number for ${updatePerson.name} failed`)
            setNoticeType('error')
          })
      }
  
      setNewName('')
      setNewNumber('')
      return
    }
  
    const newPerson = {name: newName, number: newNumber}
    personService
      .create(newPerson)
      .then(data => {
        setPersons([...persons, data])
        setMessage(`${newPerson.name} has been succesfully added to phonebook`)
        setNoticeType('success')
      })
      .catch(error => {
        setMessage(`${newPerson.name} could not be added to phonebook`)
        setNoticeType('error')
      })
    
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value) {
      setShowAll(false)
      setFilterValue(value)
    } else {
      setShowAll(true)
      setFilterValue('')
    }
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {

      personService
      .destroy(id)
      .then(() => {

        setPersons(persons.filter(person => person.id !== id))
        setMessage(`${personToDelete.name} has been succesfully removed from server`)
        setNoticeType('success')
    
      })
      .catch(error => {
        setMessage(`Information of ${personToDelete.name} has already been removed from server`)
        setNoticeType('error')
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const contacts = showAll 
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(filtervalue.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      {message && (
        <Notification 
          message={message}
          type={noticeType}
          setMessage={setMessage}
        />
      )}
      <Filter handleFilter={handleFilter} />
  
      <h3>Add a new</h3>
    
      <PersonForm
        handleSubmit={handleSubmit}
        handleSetName={handleSetName}
        handleSetNumber={handleSetNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={contacts} 
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App;
