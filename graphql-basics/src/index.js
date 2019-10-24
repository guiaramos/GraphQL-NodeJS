import { GraphQLServer } from 'graphql-yoga'

// 1- Type definitions
const typeDefs = `
type Query {
  post: Post!
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
}
`

const resolvers = {
  Query: {
    post() {
      return {
        id() {
          return 'abasd797ga9sd'
        },
        title() {
          return 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        },
        body() {
          return 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam modi minus unde quidem atque, cum ad dolores, consequatur iure laboriosam ratione maxime expedita, corrupti error. Pariatur corporis aperiam ipsum quisquam.'
        },
        published() {
          return true
        }
      }
    }
  }
}

// 3- Server
const server = new GraphQLServer({
  typeDefs,
  resolvers
})

// 4- Start
server.start(() => {
  console.log('Server is up')
})
