const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        res.json(blogs)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.post('/', async (req, res, next) => {
    const body = req.body

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({
            error: 'token missing or invalid'
        })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    try {
        if (blog.title === undefined || blog.url === undefined) {
            res.status(400).end()
        } else {
            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog.id)
            await user.save()
            res.status(201).json(savedBlog)
        }
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        if (!decodedToken.id) {
            return res.status(401).json({
                error: 'token missing or invalid'
            })
        }

        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(req.params.id)

        if (blog.user.toString() === user.id.toString()) {
            await Blog.findByIdAndRemove(req.params.id)
            res.status(204).end()
        } else {
            res.status(401).json({
                error: 'token missing or invalid'
            })
        }
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter