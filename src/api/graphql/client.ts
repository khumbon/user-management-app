import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(
  ({ operation, graphQLErrors, networkError, forward }) => {
    console.log(operation);
    console.log(forward);
    if (networkError) {
      console.log("A network error has been found : ", networkError);
    } else {
      console.log("There has been an error : ", graphQLErrors);
    }
  },
);

const httpLink = new HttpLink({
  fetchOptions: {
    mode: "cors",
  },
  uri: "http://localhost:4000/graphql",
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
});
