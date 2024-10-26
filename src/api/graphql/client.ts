import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

/**
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fetch = require('node-fetch');


const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Operation: ${operation}`
      )
    );
  }
  if (networkError) {
    console.log("A network error has been found: ", networkError);
  } else {
    console.log("There has been an error: ", operation);
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch: fetch as any,
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
});
*/
