const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
    {
        id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
]

const blogToPost = {
        id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
}

const zeroLikesBlog = {
        id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 0,
        __v: 0
}

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})

test('correct amount of JSON blogs returned', async () => {
  const res = await api
                      .get('/api/blogs')
                      .expect(200)
                      .expect('Content-Type', /application\/json/)

  expect(res.body).toHaveLength(initialBlogs.length)
})

test('posting a blog increases the length by one', async () => {
    const req = await api
                        .post('/api/blogs', blogToPost)
                        .expect(201)
                        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await Blog.collection.count()

    expect(blogsAtEnd).toBe(initialBlogs.length + 1)
})

test('deleting deletes', async () => {
    const req = await api
                        .delete('/api/blogs/5a422b3a1b54a676234d17f9')
                        .expect(204)

    console.log('deleted')
})

afterAll(() => {
    mongoose.connection.close()
})