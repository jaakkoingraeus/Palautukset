const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//Token erottaja
const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        req.token = auth.substring(7)
    }
    next()
}

const userExtractor = async (req, res, next) => {
    const auth = await req.get('authorization')
    if (!auth) {
        logger.error('no auth')
        return next()
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const idToFind = decodedToken.id
    const user = await User.findById(idToFind)
    if (user) {
        req.user = user
    }
    next()
}

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message})
    }

    next(err)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}