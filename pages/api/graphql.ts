import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { createContext } from "../../graphql/context";
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

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

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}
