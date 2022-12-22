const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'secret santa'
const MONGODB_URI = 'mongodb+srv://sudeep-k:sudeep123@cluster0.havy2gx.mongodb.net/libraryApp?retryWrites=true&w=majority'

console.log('connecting to mongodb server🔃')

mongoose.connect(MONGODB_URI)
.then(() => console.log('connected to mongodb server✅'))
.catch((error) => console.log('error connecting to mongodb server❌', error.message))

const typeDefs = `
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

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
        me: User
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

        createUser(
            username: String!
            favouriteGenre: String!
        ): User
        
        login(
            username: String!
            password: String!
        ): Token
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
        allAuthors: () => Author.find({}),
        me: (root, args, context) => context.currentUser
    },
    Author: {
        bookCount: (root) => Book.find({ author: root.name}).countDocuments() 
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (currentUser) {
                const author = new Author({ name: args.author })
                args.author = author._id
                const book = new Book({ ...args })
    
                await author.save()
                await book.save()
    
                return book
            } else {
                console.log('user authentication failed')
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (currentUser) {
                const author = await Author.findOne({ name: args.name })
                author.born = args.born
                await author.save()
                return author
            } else {
                console.log('user authentication failed')
            }
        },
        createUser: async (root, args) => {
            const user = new User({ ...args })
            return await user.save()
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                return console.log('wrong credentials')
            } else {
                const userForToken = {
                    username: user.username,
                    id: user._id
                }
                return { value: jwt.sign(userForToken, JWT_SECRET) }
            }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

console.log(`🧑‍🚀 Server ready at ${ url }`)