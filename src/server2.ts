const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Question {
    id: ID!
    title: String!
  }

  type Player {
    id: ID!
    displayName: String!
  }

  type Quiz {
    id: ID!
    title: String!
    questions: [Question]!

    player: Player!
  }

  type Query {
    quizzes: [Quiz]
  }
`

const server = new ApolloServer({
  typeDefs,
  mocks: true
})
server.setGraphQLPath('graph')

server
  .listen({
    port: 8083
  })
  .then(({ url }: any) => {
    console.log(`Server 2 ready at ${url}`)
  })
