const express = require("express");
const morgan = require("morgan");

const app = express();

// middleware
const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method);
    console.log('Path: ', req.path);
    console.log('Body: ', req.body);
    console.log('--');
    next();
}


app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content] - :response-time ms :body'));
app.use(requestLogger);


let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]

const generateId = () => {
    const maxId = notes.length > 0 ? 
        Math.max(...notes.map(n => n.id)) :
        0;
    return maxId + 1;
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(n => n.id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }  
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(n => n.id !== id);

    res.status(204).end();
})

app.post('/api/notes', (req, res) => {
    const body = req.body;

    // if (!body.header) {
    //     return res.status(400).json({
    //         error: 'content missing'
    //     })
    // }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    notes.concat(note);
    res.json(note);
})

const unknownEndPoint = (req, res, next) => {
    res.status(404).json({ error: 'unknown endpoint'});
}

app.use(unknownEndPoint);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})