const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    logger.info(blogs)
    await response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.find({_id: request.params.id })
  logger.info(blog)
  await response.json(blog)
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = await new Blog(request.body)
    const post = await blog.save()
    await response.status(201).json(post)
})

blogsRouter.delete(`/:id`, async (req, res) => {
    const blog = await Blog.deleteOne({_id: req.params.id })
    logger.info('Deleted ', blog.deletedCount, ' blog')
    await res.status(204).send('Blog deleted')
})

blogsRouter.patch(`/:id`, (req, res) => {

  Blog.updateOne(
    { _id: req.params.id },
    { "$inc": { "likes": 1 } }
  )
  .then(
    logger.info(res.status(200).send('Updated'))
  )

  /**Blog.updateOne(
    { _id: req.params.id }, 
    {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 69,
      __v: 0
    })
    .then(
      res.status(200).send('Kulli')
    )*/
})

module.exports = blogsRouter