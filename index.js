const { ApolloServer, gql } = require('apollo-server')
const { prisma } = require('./prisma-client')

async function main () {
  const allPlayers = await prisma.players()
  const allGames = await prisma.games()

  const typeDefs = gql`
    type Player {
      name: String!
      id: String!
      game: Game
      name: String!
      score: Int
    }

    type Game {
      id: ID!
      targetScore: Int!
      players: [Player!]!
      hasFinished: Boolean
    }

    type Query {
      games: [Game]
      players: [Player]
    }
  `

  const resolvers = {
    Query: {
      players: () => allPlayers,
      games: () => allGames,
    },
  }

  const server = new ApolloServer({ typeDefs, resolvers })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main().catch((e) => console.error(e))
