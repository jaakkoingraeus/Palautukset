const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to mongo')
  })
  .catch(err => {
    console.log('Error connecting to database', err.message)
  })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)