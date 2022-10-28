require("dotenv").config();
const { json } = require("express");
const express = require("express");
const morgan = require("morgan");
const Person = require("./modals/person");

const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// get all persons
app.get('/api/persons', (req, res) => {
    Person.find({})
    .then(person => {
        res.json(person)
    })
})

// get info of the request
app.get('/info', (req, res) => {
    const personsCount = persons.length;
    const date = new Date();

    res.send(`<div>
                <h3>Phonebook has info for ${personsCount} people</h3>
                <h3>${date}</h3>
            </div>`)
})

// get individual person
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        next(err);
    })
})

// delete individual person
app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end();
    })
    .catch(err => {
        next(err)
    })
})

// add a new person
app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        next(err);
    })
})

// update the person
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
        res.json(updatedPerson)
    })
    .catch(err => {
        next(err)
    })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

// handles unknown endpoints
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error);
}

// handles errors
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})

