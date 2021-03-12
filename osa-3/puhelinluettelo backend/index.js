require('dotenv').config()
const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(json())
app.use(cors())



morgan.token('bodyContent', (req) => {
  console.log(req.body)
  return (
    JSON.stringify(req.body)
  )
})

let numOfPers = 0


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyContent'))

//Kaikki henkilöt
app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    console.log('People data added from the database', people)
    numOfPers = people.length
    res.json(people)
  })
})

//Info
app.get('/info', (req, res) => {
  res.send(
    `<div>Phonebook has info for ${numOfPers} people</div>
        <div><br>${new Date()}</div>`)
})

//Tietyn henkilön haku
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then( person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch( error => next(error) )
})

//Poistaminen
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then( () => {
      res.status(204).end()
    })
    .catch( error => {
      next(error)
    })
})

//Lisääminen
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const personToAdd = new Person({
    name: `${body.name}`,
    number: `${body.number}`
  })

  personToAdd.save()
    .then( () => {
      console.log(`${body.name} added successfully`)
    })
    .catch( error => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const updatedPerson = {
    name: `${req.body.name}`,
    number: `${req.body.number}`,
  }

  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true })
    .then( updated => {
      res.json(updated)
    })
    .catch( error => {
      next(error)
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server started on port: ', PORT)
})