import React from 'react';
import './All.css'

export const Filter = (props) => {
    const value = props.value
    const handleFunc = props.handleFilterChange
    return (
      <div>
        Filter: <input onChange={handleFunc} value={value} />
      </div>
    )
}

export const Form = (props) => {
    return (
      <div>
        <form onSubmit={props.onSubmitButton}>
          <div>
            Name: <input value={props.nameValue} onChange={props.onNameChange}/>
          </div>
          <div>
            Number: <input value={props.numberValue} onChange={props.onNumberChange}/>
          </div>
          <div>
            <button type="sumbit">Add</button>
          </div>
        </form>
      </div>
    )
}

export const Persons = (props) => {
    const personsToShow = props.persons
    return (
      <div>
          {personsToShow.map( (person, index) => <div key={index}>{person.name} {person.number} <button onClick={props.deletePerson} value={person.id}>Delete</button></div>)}
      </div>
    )
}

export const Message = ({message}) => {
  if (message === null || message === '') {
    return null
  }

  return (
    <div className="goodMessage">
      {message}
    </div>
  )
}

export const Alert = ({message}) => {
  if (message === null || message === '') {
    return null
  }

  return (
    <div className="alertMessage">
      {message}
    </div>
  )
}