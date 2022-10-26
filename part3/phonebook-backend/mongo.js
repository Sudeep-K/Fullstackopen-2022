const mongoose = require('mongoose');

if (process.argv.length < 5) {
    console.log("Please provide password, name and number as argument: node mongo.js <password> <name> <number>");
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://sudeep-k:${password}@cluster0.havy2gx.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Phonebook = new mongoose.model('Note', phonebookSchema);

// saves name and number to the database
mongoose.connect(url)
.then(result => {
    console.log('connected');

    const phonebook = new Phonebook({
        name,
        number
    })

    return phonebook.save();
})
.then(result => {
    console.log(`added ${name} number ${number} to phonebook`);
    return mongoose.connection.close();
})
.catch(err => console.log(err));

// retrieves data of contact from database
mongoose.connect(url)
.then(result => {
    console.log('connected');

    return Phonebook.find({});
})
.then(result => {
    console.log('phonebook: ');
    result.map(contact => console.log(contact.name, contact.number));
    return mongoose.connection.close();
})
.catch(err => console.log(err));