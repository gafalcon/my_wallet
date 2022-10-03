import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { createContext } from "../../graphql/context";
import type { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}
