const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
  
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
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login/', loginRouter)
app.use('/api/users/', usersRouter)
app.use('/api/blogs/', middleware.userExtractor, blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
  
module.exports = app