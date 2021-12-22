require('dotenv').config()
const { ApolloServer, gql, ApolloError, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const data = require('./data/initData')
const Book = require('./models/book')
const Author = require('./models/author')

//Setup MongoDB
const MONGO_URI = process.env.MONGO_URI
mongoose
  .connect(MONGO_URI)
  .then( res => {
    console.log('Connected to MongoDB')
  })
  .catch( err => {
    console.error('ERROR connecting to MongoDB', err)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount(name: String): Int!
    authorCount: Int!
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
        setToBorn: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!  
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
`

const resolvers = {
  Query: {
      bookCount: async () => {
        try {
          return await Book.countDocuments()
        } catch (error) {
          throw new ApolloError(error.message)
        }
      },
      authorCount: async () => {
        try {
          return await Author.countDocuments()
        } catch (error) {
          throw new ApolloError(error.message)
        }
      },
      allBooks: async (root, args) => {
        if (!args.author && !args.genre) {
            try {
              return await Book.find({}).populate('author')
            } catch (error) {
              throw new ApolloError(error.message)
            }
        }

        else if (args.author && !args.genre) {
            try {
              const authorId = (await Author.findOne({ name: args.author }))._id
              return await Book.find({ author: authorId }).populate('author')
            } catch (error) {
              throw new UserInputError(error.message)
            }
        }
        
        else if (!args.author && args.genre) {
            try {
              return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
            } catch (error) {
              throw new UserInputError(error.message)
            }
        }

        else {
            try {
              const authorId = (await Author.findOne({ name: args.author }))._id
              return await Book.find({ genres: { $in: [args.genre] } }).populate('author').find({ author: authorId })
            } catch (error) {
              throw new UserInputError(error.message)
            }
        }
    },
      allAuthors: async () => {
        try {
          return await Author.find({})
        } catch (error) {
          throw new ApolloError(error.message)
        }
      },
  },

  Author: {
      bookCount: async (root) => {
          try {
            const authorId = (await Author.findOne({ name: root.name }))._id
            return await Book.find({ author: authorId }).countDocuments()
          } catch (error) {
            throw new ApolloError(error.message)
          }
      }
  },

  Mutation:  {
      addBook: async (root, args) => {
          //Create author if non-existing
          const exists = await Author.exists({ name: args.author })

          if (!exists) {
            const newAuthor = new Author({ name: args.author })
            await newAuthor.save()
          }

          const bookToAdd = new Book({
              title: args.title,
              author: (await Author.findOne({ name: args.author }))._id,
              published: args.published,
              genres: args.genres,
              id: uuid()
          })
          await bookToAdd.save()

          return await bookToAdd.populate('author')
      },

      editAuthor: async (root, args) => {
          const author = await Author.findOne({ name: args.name })
          if (!author) {
            throw new UserInputError('author non-existing in database')
          }

          author.born = args.setToBorn
          await author.save()
          
          return author
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})