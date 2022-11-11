const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Note = require('../models/note')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('notes', {content: 1, date: 1})
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const body = req.body
    const username = body.username

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return res.status(400).json({ error : 'username to be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser) 
})

module.exports = usersRouter