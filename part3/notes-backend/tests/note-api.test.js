const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test-helper')
const Note = require('../models/note')

const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})
    console.log('cleared')
    
    const noteObjects = helper.initialNotes.map(n => new Note(n))
    
    const promiseArray = noteObjects.map(n => n.save())
    
    await Promise.all(promiseArray)

    console.log('done')
}, 100000)

test('notes are returned as json', async () => {
    await api
    .get('/api/notes')
    .expect(200)
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

test('a valid note can be added', async () => {
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

test('note without content is not added', async () => {
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

test('specific note to be viewed', async () => {
    const noteAtStart = await helper.notesInDb();

    const noteToView = noteAtStart[0]

    const resultNote = await api.get(`/api/notes/${noteToView.id}`)
    .expect(200)

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resultNote.body).toEqual(processedNoteToView)
})

test("specific note to be deleted", async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

    const contents = notesAtEnd.map(n => n.content)

    expect(contents).not.toContain(noteToDelete.content)
})

afterAll(() => mongoose.connection.close())