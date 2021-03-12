import React, { useState, useEffect } from 'react';
import {Filter, Form, Persons, Message, Alert} from './components/All';
import Server from './components/Server';

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ personsToShow, setPersonsToShow ] = useState([])
  const [ message, setMessage ] = useState('')
  const [ alert, setAlert ] = useState('')

  //Ilmoitusviesti
  const goodMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  //Error-viesti
  const alertMessage = message => {
    setAlert(message)
    setTimeout(() => {
      setAlert('')
    }, 3000)
  }


  //Haetaan nimet palvelimelta
  useEffect( () => {
    Server.getAll().then(
      notes => {
        setPersons(notes)
        setPersonsToShow(notes)
      }
    )
  }, [])

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
      setFilter(event.target.value)
      //Muutetaan ehto pieniksi kirjaimiksi
      const condition = event.target.value.toLowerCase()
      //Muutetaan näkyvien henkilöiden listaa
      setPersonsToShow(
        persons.filter(
          person => person.name.toLocaleLowerCase().includes(condition)
        )
      )
  }

  const newContact = (event) => {
    //Luodaan uusilla tiedoilla olio
    const newPerson = {
      name: `${newName}`,
      number: `${newNumber}`
    }

    //Tarkistetaan nimen perusteella, onko henkilö jo lisätty
    if (
      !persons.some(
        person =>
        person.name === `${newName}`
      )
    ) {

    //Lisätään annettu henkilö
    event.preventDefault()

    Server.create(newPerson)
      .then( newPerson => {
        setPersons(persons.concat(newPerson))
        setPersonsToShow(persons.concat(newPerson))
        goodMessage(`Added ${newName}`)
      })
      .catch( error => {
        alertMessage(`${error.response.data.error}`)
        return 
      })

    //Tyhjätään kentät
    setNewName('')
    setNewNumber('')
    setFilter('')
    

    } else {
      event.preventDefault()
      if (window.confirm(`Do you want to replace ${newName}'s number?`)) {

        //Henkilön numeron korvaaminen
        console.log('Replacing...', newName);
        const chosenPerson = persons.filter( person => person.name === newName )[0]
        const id = chosenPerson.id
        const indexOfThePerson = persons.indexOf(chosenPerson)
        console.log(indexOfThePerson)

        Server.replace(id, newPerson).then( fixedPerson => {
          const newList = persons.splice(indexOfThePerson, 1, fixedPerson)
          console.log(persons)
          setNewName('')
          setNewNumber('')
          setFilter('')
          goodMessage('Number was changed.')
        }).catch( error => {
          alertMessage('This contact no longer exists. Please refresh the page.')
        })
      }
      }
    }

  //Henkilön poistaminen
  const deletePerson = (event) => {
    const id = event.target.value

    //Tehdään varmistus
    if (window.confirm(`Are you sure you want to delete this contact?`)) {
    
    console.log(id)

    const lessPersons = persons.filter( person => person.id !== parseInt(id))

    setPersons(lessPersons)
    setPersonsToShow(lessPersons)

    Server.deletePerson(id).then( res => {
      goodMessage('Deleted successfully.')
    })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Message message={message}/>
        <Alert message={alert} />
        <Filter value={filter} handleFilterChange={handleFilterChange} />
        <Form onSubmitButton={newContact} nameValue={newName} onNameChange={handleNameChange} numberValue={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
