const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/notes')
  
const mongoUrl = config.MONGODB_URI

logger.info("Connecting to ", mongoUrl)

mongoose
    .connect(mongoUrl, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false, 
      useCreateIndex: true 
    })
    .then( () => {
      logger.info("Connected to MongoDB")
    })
    .catch( err => {
      logger.error("Error connecting to MongoDB: ", error.message)
    })
  
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
  
module.exports = app