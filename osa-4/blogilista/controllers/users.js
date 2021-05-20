const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const body = req.body
    //Validoidaan body

    //Määrittely
    if ( !body.username|| !body.password ) {
        res.status(400).send('Password and username must be defined.')
        return
    }

    //Pituus
    if ( body.username.toString().length < 3 || body.password.toString().length < 3 ) {
        res.status(400).send('Password and username must be longer than 3 characters.')
        return
    }

    //Tarkistetaan käyttäjätunnuksen uniikkius
    const sameUsername = await User.find({ username: body.username })

    console.log('Same username: ', sameUsername)

    if (sameUsername.length !== 0) {
        res.status(400).send('Username must be unique')
        return
    }

    //Encrypt number
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

usersRouter.get('/', async (req, res) => {
    const userList = await User.find({})

    res.json(userList.map( user => user.toJSON()))
})

module.exports = usersRouter

/**
 * Pitää olla password ja username ja min 3 merkkiä
 * 
 * Uniikki username
 * 
 * Post metodin tulee palauttaa status ja error
 * 
 * 
 */