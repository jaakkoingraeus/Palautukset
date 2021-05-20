const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

usersRouter.post('/', async (req, res) => {
    const body = req.body
    
    //Validoidaan body
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

    if ( sameUsername.length !== 0 ) {
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
    //Alustetaan listat
    const userList = await User.find({})
    logger.info({userList})
    //const blogList = await Blog.find({})
    //logger.info({blogList})

    const newList = await Promise.all(userList.map( async (user) => {
        const blogsByUser = await Blog.find({ user: user.id })
        logger.info('Blogs by user: ', blogsByUser)
        const ret = await {...user.toJSON(), blogs: blogsByUser}
        return ret
    }))
    
    logger.info('New list: ', newList)
    res.json(newList)
    
})

module.exports = usersRouter