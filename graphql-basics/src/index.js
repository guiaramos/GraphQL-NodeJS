import { GraphQLServer } from 'graphql-yoga'
import Axios from 'axios'

// Get user data
const users = Axios.create({
  baseURL: 'https://randomuser.me/api/',
  data: 'json'
})

// 1- Type definitions
const typeDefs = `
type Query {
  users(qtd: Int!, query: String):[User!]!
  me: User!
  post: Post!
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
}

type User {
  login: ILogin!
  name: IName!
  email: String!
  dob: IDob!
}

type ILogin {
  uuid: ID!
  username: String!
  password: String!
  salt: String!
  md5: ID!
  sha1: ID!
  sha256: ID!
}

type IDob {
  date: String!
  age: Int!
}

type IName {
  title: String!
  first: String!
  last: String!
}
`
const resolvers = {
  Query: {
    users(obj, args, ctx, info) {
      return users
        .get('/', {
          params: {
            results: args.qtd,
            inc: ['login', 'name', 'email', 'dob'] + ''
          }
        })
        .then(res => {
          const data = res.data.results
          if (args.query)
            return data.filter(user =>
              user.name.first.toLowerCase().includes(args.query.toLowerCase())
            )
          return data
        })
    },
    me() {
      return {
        id() {
          return 'asdas798987'
        },
        name() {
          return 'Guilherme Ramos'
        },
        email() {
          return 'guilherme.ramos@live.com'
        },
        age() {
          return 28
        }
      }
    },
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
