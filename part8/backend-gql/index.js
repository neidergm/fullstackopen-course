const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { default: mongoose } = require('mongoose')
const config = require("./config")
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const Author = require('./schemas/AuthorSchema')
const Book = require('./schemas/BookSchema')
const User = require('./schemas/UserSchema')

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI).then(() => {
    console.log("Connected to mongodb")
}).catch(() => {
    console.error("Error connecting to mongodb")
})

const typeDefs = `
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]
    id: ID!
  }

  type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
  }

  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book

    editAuthor(
        name: String!
        born: Int
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
`

const resolvers = {
    Query: {
        authorCount: async () => await Author.countDocuments({}),
        bookCount: async () => await Book.countDocuments({}),
        allBooks: async (_, { author, genre }, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            let filter = {};
            // if (author) {
            //     list = list.filter(book => book.author === author)
            // }
            if (genre) {
                filter.genres = genre === "recommended" ? currentUser.favoriteGenre : genre
            }
            return await Book.find(filter)
        },
        allAuthors: async () => await Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (root) => {
            return await Book.find({ author: root.name }).countDocuments()
        }
    },
    Mutation: {
        addBook: async (_, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            const book = args;
            try {
                const authorExist = await Book.findOne({ author: book.author });

                if (!authorExist) {
                    const result = await new Author({ name: book.author }).save()
                        .catch(error => {
                            throw new Error(error)
                        });
                    //    book.author = result._id;
                }

                return await new Book(book).save();
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: { code: 'BAD_USER_INPUT', error },
                });
            }
        },
        editAuthor: async (_, args, { currentUser }) => {

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            try {
                const result = await Author.findOneAndUpdate({
                    name: args.name
                }, {
                    born: args.born
                }, {
                    new: true
                })
                return result;
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: { code: 'BAD_USER_TO_UPDATE', error },
                });
            }
        },

        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    })
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})