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
    uri: "https://slow-bars-smoke.loca.lt/graphql",
    headers: {
      Authorization: `Bearer b8a79ca9-9ab8-4323-829c-93e4b6d32149`,
    },
  }),
  cache,
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
