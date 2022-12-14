const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const helper = require('./test-helper')
const Note = require('../models/note')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
})

describe('when there are initially some notes saved', () => {
    test('notes are returned as json', async () => {
        await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all notes returned', async () => {
        const response = await api.get('/api/notes')
    
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })
    
    test('a specific note is returned within the notes', async () => {
        const response = await api.get('/api/notes')
    
        const contents = response.body.map(r => r.content)
        expect(contents).toContain('Browser can execute only Javascript')
    })
})

describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
        const notesAtStart = await helper.notesInDb()

        const noteToView = notesAtStart[0]

        const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

        expect(resultNote.body).toEqual(processedNoteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })
})

describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
        const newNote = {
            content: 'async/await simplifies the async calls',
            important: true
        }
    
        await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
    
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    
        const contents = notesAtEnd.map(n => n.content)
        expect(contents).toContain('async/await simplifies the async calls')
    })

    test('fails with status code 400 if data is invalid', async () => {
        const newNote = {
            important: true
        }
        
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
        
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]
  
      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)
  
      const notesAtEnd = await helper.notesInDb()
  
      expect(notesAtEnd).toHaveLength(
        helper.initialNotes.length - 1
      )
  
      const contents = notesAtEnd.map(r => r.content)
  
      expect(contents).not.toContain(noteToDelete.content)
    })
})

describe('when there is initally one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username:'root', name:'superuser', passwordHash })
        
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Sudeep-K',
            name: 'Sudeep Kaucha',
            password: 'sudeep$9'
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const userNames = await usersAtEnd.map(u => u.username)
        expect(userNames).toContain(newUser.username)
    })

    test('creation fails with proper status code and message if username already exists', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'superuser',
            password: 'sekret'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => mongoose.connection.close())