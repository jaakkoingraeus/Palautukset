const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  const Blog = mongoose.model('Blog', blogSchema)
  
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
  
  app.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then( blogs => {
          logger.info(blogs)
          response.json(blogs)
      })
      .catch( err => {
          logger.error(err)
      })
  })
  
  app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = app