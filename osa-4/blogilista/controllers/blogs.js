const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

const getTokenFrom = (req) => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        return auth.substring(7)
    }
    return null
}

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
    const body = {...request.body}
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const user = await User.findById(decodedToken.id)
    const finalBody = await { ...body, user: user.id }
    const blog = new Blog(finalBody)
    const post = await blog.save()
    await response.status(201).json(post)
})

blogsRouter.delete(`/:id`, async (req, res) => {
    const blog = await Blog.deleteOne({_id: req.params.id })
    logger.info('Deleted ', blog.deletedCount, ' blog')
    await res.status(204).send('Blog deleted')
})

module.exports = blogsRouter