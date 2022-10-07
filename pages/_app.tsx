import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ApolloProvider } from "@apollo/client";
import TopBar from "../components/TopBar";
import apolloClient from "../lib/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <TopBar />
        <main className="container mx-auto">
          <Component {...pageProps} />
        </main>
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
