import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

let _client: ReturnType<typeof createApolloClient> | null = null;

function createApolloClient() {
  return new ApolloClient({
    link: createHttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      fetch,
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });
}

export function getClient() {
  if (!_client) {
    _client = createApolloClient();
  }
  return _client;
}
