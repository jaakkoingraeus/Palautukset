const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    logger.info(blogs)
    await response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.find({_id: request.params.id })
  logger.info(blog)
  await response.json(blog)
})
  
blogsRouter.post('/', async (request, response) => {
    const userToAdd = (await User.findOne({})).id
    const body = {...request.body, user: userToAdd }
    
    const blog = await new Blog(body)
    const post = await blog.save()
    await response.status(201).json(post)
})

blogsRouter.delete(`/:id`, async (req, res) => {
    const blog = await Blog.deleteOne({_id: req.params.id })
    logger.info('Deleted ', blog.deletedCount, ' blog')
    await res.status(204).send('Blog deleted')
})

module.exports = blogsRouter