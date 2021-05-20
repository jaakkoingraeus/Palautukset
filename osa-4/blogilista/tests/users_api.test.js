const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

const saltRounds = 10

const passW1 = bcrypt.hash("naaais", saltRounds)
const passW2 = bcrypt.hash("kiiisujapaljon", saltRounds)

const existingUsers = [
    {
        username: "jaakkojuhana",
        name: "Jaakko Roikka",
        password: passW1
    },
    {
        username: "jaakkokaks",
        name: "Jaakko Kaks",
        password: passW2
    }
]

beforeEach( async () => {
    await User.deleteMany({})
    let newUserBody = existingUsers[0]
    let newUser = await new User({newUserBody})
    await newUser.save()
    newUserBody = existingUsers[1]
    newUser = await new User({newUserBody})
    await newUser.save()
})

test('Mongo users[] length equals initalUsers[] length', async () => {
    const usersFromMongo = await User.find({})
    expect(usersFromMongo).toHaveLength(existingUsers.length)
})

test('User creation with already taken username results to error', async () => {
    const sameUsername = {
        username: "jaakkojuhana",
        name: "Jaakko Kaksi",
        password: "jippii"
    }

    console.log('Samat testi', sameUsername, existingUsers[0])

    await api
      .post('/api/users/')
      .send(sameUsername)
      .expect(400)
})

test('Too short password results to error', async () => {
    const tooShortPW = {
        username: "jake",
        name: "Jaakko Kaksi",
        password: "okfasdf"
    }

    await api
      .post('/api/users/')
      .send(tooShortPW)
      .expect(200)
})

afterAll(() => {
    mongoose.connection.close()
})