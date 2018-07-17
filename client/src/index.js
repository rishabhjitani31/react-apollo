import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import ManualQuery from "./ManualQuery";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new HttpLink({ uri: "http://localhost:3001/graphql" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ManualQuery id={2} />
  </ApolloProvider>,
  document.getElementById("root")
);
