const config = require('./utils/config')
const express = require('express')

app = express()

const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Connecting to:', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to Mongodb')
})
.catch((err) => {
    logger.error('error connecting to MongoDB: ', err.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app
