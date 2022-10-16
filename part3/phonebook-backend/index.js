const express = require("express");
const persons = require("./persons");

const app = express();

app.get('/api/persons', (req, res) => {
    res.json(persons);
})


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})

