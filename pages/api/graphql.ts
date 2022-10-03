import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { createContext } from "../../graphql/context";

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  context: createContext,
});

const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}
