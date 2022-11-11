const User = require('../models/user')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1})
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const body = req.body
    const username = body.username

    const user = await User.findOne({ username })
    if (user) {
        return res.status(400).json({ error: 'username must be unique' })
    } else if (!(body.username) || !(body.password)) {
        return res.status(400).json({ error: 'username and password are required' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
})

module.exports = usersRouter