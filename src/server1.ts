const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    displayName: String!
  }

  type Site {
    id: ID!
    title: String!
    description: String!
    theme: ID!

    author: User!
  }

  type Query {
    sites: [Site]
    sitesByUserId(userId: ID!): [Site]
  }
`

const server = new ApolloServer({
  typeDefs,
  mocks: true
})
server.setGraphQLPath('graph')

server
  .listen({
    port: 8082
  })
  .then(({ url }: any) => {
    console.log(`Server 1 ready at ${url}`)
  })
