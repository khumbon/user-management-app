import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Operation: ${operation}`,
      ),
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
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
});
