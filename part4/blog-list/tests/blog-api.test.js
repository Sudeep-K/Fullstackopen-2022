const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test-helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    const blogObjects = helper.initialBlogs.map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
})

test('blog list returns correct amount of blog posts', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)

    response.body.map(r => {
        expect(r.id).toBeDefined()
    })
})

test('making an HTTP POST request successfully creates a new blog post', async () => {
    const newBlog = {
        title: 'this blog checks the post request to the server',
        author: 'sudeep kaucha',
        url: 'https://github.com/Sudeep-K',
        likes: 0
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('this blog checks the post request to the server')
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        title: 'if like property is missing, default to 0',
        author: 'sudeep kaucha',
        url: 'https://github.com/Sudeep-K',
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(b => b.title === 'if like property is missing, default to 0')
    expect(addedBlog.likes).toBe(0)
})

test('if the title or url properties are missing from the request data', async () => {
    const newBlog = {
        title: 'if like property is missing, default to 0',
        author: 'sudeep kaucha',
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => mongoose.connection.close())





