const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://sudeep-k:${password}@cluster0.havy2gx.mongodb.net/noteApp?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
});

const Note = mongoose.model("Note", noteSchema);

mongoose.connect(url)
.then(result => {
    console.log('connected');

    // // Create a new note
    // const note = new Note({
    //     content: 'Need to go tala mann',
    //     date: new Date(),
    //     important: false
    // })

    // return note.save();

    return Note.find({important: true})
})
.then(result => {
    result.forEach(note => {
        console.log(note)
    })
    return mongoose.connection.close();
})
.catch(err => console.log(err))