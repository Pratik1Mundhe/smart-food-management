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
      Authorization: `Bearer 0787031c-d9a2-487c-b6b4-94fdab089f7d`,
    },
  }),
  cache,
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
