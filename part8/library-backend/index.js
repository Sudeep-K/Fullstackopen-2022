const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = 'mongodb+srv://sudeep-k:sudeep123@cluster0.havy2gx.mongodb.net/libraryApp?retryWrites=true&w=majority'

console.log('connecting to mongodb server🔃')

mongoose.connect(MONGODB_URI)
.then(() => console.log('connected to mongodb server✅'))
.catch((error) => console.log('error connecting to mongodb server❌', error.message))

const typeDefs = `
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        author(name: String!): Author
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            born: Int!
        ): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        author: (root, args) => Author.findOne({ name: args.name }),
        allBooks: (root, args) => {
            if(!args.author && !args.genre) {
                return Book.find({})
            } else if (args.author) {
                return Book.find({ author: args.author })
            } else {
                return Book.find({ genres: {$in: [args.genre]} })
            }
        },
        allAuthors: () => Author.find({})
    },
    Author: {
        bookCount: (root) => Book.find({ author: root.name}).countDocuments() 
    },
    Mutation: {
        addBook: (root, args) => {
            const author = new Author({ name: args.author })
            args.author = author._id
            const book = new Book({ ...args })

            author.save()
            book.save()

            return book
        },
        editAuthor: (root, args) => {
            const author = Author.findOne({ name: args.name })
            author.born = args.born
            author.save()
            return author
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`🧑‍🚀 Server ready at ${ url }`)