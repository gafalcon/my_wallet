import { ApolloServer } from "apollo-server-micro"
import {typeDefs} from "../../server/graphql/schemas"
import {resolvers} from "../../server/graphql/resolvers"
import {ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled} from "apollo-server-core"

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
})

const startServer = apolloServer.start()

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req, res) {
    await startServer;
    await apolloServer.createHandler({path: "/api/graphql"})(req, res)
}
