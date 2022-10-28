require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Note = require('./models/note')

const app = express()

// // middleware
// const requestLogger = (req, res, next) => {
//     console.log('Method: ', req.method);
//     console.log('Path: ', req.path);
//     console.log('Body: ', req.body);
//     console.log('--');
//     next();
// }

app.use(express.static('build'))
app.use(express.json())
// morgan.token('body', (req, res) => JSON.stringify(req.body));
// app.use(morgan(':method :url :status :res[content] - :response-time ms :body'));
// app.use(requestLogger);

app.get('/api/notes', (req, res) => {
	Note.find({})
		.then(notes => {
			res.json(notes)
		})
})

app.get('/api/notes/:id', (req, res, next) => {
	Note.findById(req.params.id)
		.then(note => {
			if (note) {
				res.json(note);
			} else {
				res.status(404).end();
			}
		})
		.catch(err => {
			next(err)
		})
})

app.delete('/api/notes/:id', (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(err => {
			next(err)
		})
})

app.post('/api/notes', (req, res, next) => {
	const body = req.body;

	if (body.content === undefined) {
		return res.status(400).json({ error: 'content missing' });
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
	})

	note.save()
		.then(savedNote => {
			res.json(savedNote)
		})
		.catch(err => { next(err) })
})

app.put('/api/notes/:id', (req, res, next) => {
	const { content, important } = req.body

	Note.findByIdAndUpdate(req.params.id, {content, important}, {new: true, runValidators: true, context: 'query'})
		.then(updatedNote => {
			res.json(updatedNote)
		})
		.catch(err => {
			next(err)
		})
})


const unknownEndPoint = (req, res) => {
	res.status(404).json({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		response.status(400).send({ error: error.message })
	}

	next(error)
}

// handler of requests with results to errors
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
})