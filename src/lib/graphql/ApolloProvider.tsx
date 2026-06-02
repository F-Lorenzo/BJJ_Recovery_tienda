"use client";

import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react";
import { client } from "./client";

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}
