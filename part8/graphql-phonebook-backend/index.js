const { ApolloServer } = require('@apollo/server')
const { ApolloServerErrorCode } = require('@apollo/server/errors')
const mongoose = require('mongoose')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')

const Person = require('./models/person')
const User = require('./models/user')

const JWT_SECRET = 'SECRET'
const MONGODB_URI = 'mongodb+srv://sudeep-k:sudeep123@cluster0.havy2gx.mongodb.net/phonebookApp?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('connected to MongoDb')
})
.catch((error) => {
  console.log('error connection to MongoDb:', error.message)
})

const typeDefs = `
  type Address {
    street: String!
    city: String!
  }

  type User {
    username: String!,
    friends: [Person!]!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      street: String!
      city: String!
      phone: String
    ): Person,
    editNumber(
      name: String!
      phone: String!
    ): Person,
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token,
    addAsFriend(
      name: String!
    ): User
  }
`

const resolvers = {
  Query: {

    personCount: async () => Person.collection.countDocuments(),

    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({})
      }
      return Person.findOne({ phone: {$exists: args.phone === 'YES' } })
    },

    findPerson: async (root, args) => Person.findOne({ name: args.name }),

    me: (root, args, context) => {
      console.log(context)
      return context.currentUser
    }
  },

  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    },
  },

  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED("not authenticated")
      }

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
      } catch (error) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT(error.message, {
          invalidArgs: args
        })
      }

      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone
      
      try {
        return person.save()
      } catch (error) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT(error.message, {
          invalidArgs: args
        })
      }

      return person
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
      .catch(error => {
        throw new ApolloServerErrorCode.BAD_USER_INPUT(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'SECRET' ) {
        return console.log('wrong credential')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      console.log(userForToken)
      return { value: await jwt.sign(userForToken, JWT_SECRET) }
    },
    addAsFriend: async (root, args,{ currentUser }) => {
      const isFriend = (person) =>
        currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())

      if(!currentUser) {
        throw new ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED("not authenticated")
      }

      const person = await Person.findOne({ name : args.name})
      if( !isFriend(person) ) {
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const initializeServer = async () => {
  return await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = await jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        console.log(decodedToken)
        const currentUser = await User.findById(decodedToken.id)
        
        return { currentUser }
      }
    }
  })
}

const { url } = initializeServer()

console.log(`Server starting at port ${url}`)
