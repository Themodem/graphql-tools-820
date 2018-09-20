import { makeRemoteExecutableSchema, mergeSchemas, introspectSchema } from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
// @ts-ignore
import * as fetch from 'isomorphic-fetch'
import { ApolloServer } from 'apollo-server'

const run = async () => {
  const schema1Link = new HttpLink({ uri: 'http://0.0.0.0:8082/graph', fetch })
  const schema1 = await introspectSchema(schema1Link)

  const executableSchema1 = makeRemoteExecutableSchema({
    link: schema1Link,
    schema: schema1
  })

  const schema2Link = new HttpLink({ uri: 'http://0.0.0.0:8083/graph', fetch })
  const schema2 = await introspectSchema(schema2Link)

  const executableSchema2 = makeRemoteExecutableSchema({
    link: schema2Link,
    schema: schema2
  })

  const linkTypeDefs = `
        extend type Player {
            sites: [Site]
        }
    `

  const schemas = mergeSchemas({
    schemas: [executableSchema1, executableSchema2, linkTypeDefs],
    resolvers: {
      Player: {
        sites: {
          fragment: '... on Player { id }',
          resolve(user: any, args: any, context: any, info: any) {
            return info.mergeInfo.delegateToSchema({
              schema: executableSchema2,
              operation: 'query',
              fieldName: 'sitesByUserId',
              args: {
                userId: user.id
              },
              context,
              info
            })
          }
        }
      }
    }
  })

  const server = new ApolloServer({
    schema: schemas
  })

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
}

run()
