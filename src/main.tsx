import { createRoot } from "react-dom/client";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import "./index.css";
import App from "./App.tsx";

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://free-meals-say.loca.lt/graphql",
    headers: {
      Authorization: `Bearer 05f18897-3259-4e91-bdb9-3dc7eb2565f4`,
    },
  }),
  cache,
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
