import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserManager } from "./components";
import React from "react";

const queryClient = new QueryClient();
import { ApolloProvider } from "@apollo/client";

import { client } from "./api";
const App = () => {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <UserManager queryClient={queryClient} />
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default App;
