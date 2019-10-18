import { GraphQLServer } from 'graphql-yoga';

// 1- Type definitions
const typeDefs = `
type Query {
  hello: String!
  name: String!
  location: String!
  bio: String!
}
`;

// 2 - Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query';
    },
    name() {
      return 'Guilherme';
    },
    location() {
      return 'Korea';
    },
    bio() {
      return 'I am developer';
    }
  }
};

// 3- Server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

// 4- Start
server.start(() => {
  console.log('Server is up');
});
