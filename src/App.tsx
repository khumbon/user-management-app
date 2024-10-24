import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserManager } from "./components";

const queryClient = new QueryClient();
import { ApolloProvider } from "@apollo/client";

import { client } from "./api";
const App = () => {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <UserManager />
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default App;
