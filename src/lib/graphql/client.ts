import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
  const session =
    typeof window !== "undefined" ? localStorage.getItem("woo-session") : null;

  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(session && { "woocommerce-session": `Session ${session}` }),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
