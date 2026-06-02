import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

/**
 * Custom fetch that captures the woocommerce-session header from every
 * response and persists it so cart state survives between page loads.
 */
const sessionCaptureFetch: typeof fetch = (uri, options) => {
  return fetch(uri, options).then((response) => {
    if (typeof window !== "undefined") {
      const token = response.headers.get("woocommerce-session");
      if (token && token !== "false") {
        localStorage.setItem("woo-session", token);
      }
    }
    return response;
  });
};

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetch: sessionCaptureFetch,
});

/** Attaches auth + session tokens to every outgoing request */
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
