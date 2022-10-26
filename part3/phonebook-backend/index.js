const { json } = require("express");
const express = require("express");
const morgan = require("morgan");
let persons = require("./persons");

const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// generates a unique id
const generateId = () => {
    return parseInt(Math.random() * 10000000);
}

// verifies the header body for full information
const verifyData = (body) => {
    if (!body.name || !body.number) {
        if (!body.name) {
            return { error: 'include name in request body' }
        } else {
            return { error: 'include number in request body' }
        }
    } else if (persons.find(p => p.name === body.name)) {
        return { error: 'name must be unique' }
    }
}

// get all persons
app.get('/api/persons', (req, res) => {
    res.json(persons);
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
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);

    const person = persons.find(p => p.id === id);

    if (!person) {
        return res.status(404).send();
    }

    res.json(person);
})

// delete individual person
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!persons.find(p => p.id === id)) {
        return res.status(404).send();
    }

    persons = persons.filter(p => p.id !== id);
    res.status(204).end();
})

// add a new person
app.post('/api/persons', (req, res) => {
    const body = req.body;

    const message = verifyData(body);
    if (message) {
        res.json(message);
    }

    const person = {
        id: generateId(),
        name: body.name, 
        number: body.number
    }

    persons.push(person);
    res.json(persons);
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})

