const { ApolloServer, gql } = require('apollo-server')
const { prisma } = require('./prisma-client')

async function main () {
  const allPlayers = await prisma.players()

  const typeDefs = gql`
    type Player {
      name: String!
      id: String!
    }

    type Query {
      players: [Player]
    }
  `

  const resolvers = {
    Query: {
      players: () => allPlayers,
    },
  }

  const server = new ApolloServer({ typeDefs, resolvers })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main().catch((e) => console.error(e))
