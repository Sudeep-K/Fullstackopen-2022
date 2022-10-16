const express = require("express");
let persons = require("./persons");

const app = express();

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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})

