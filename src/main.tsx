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
    uri: "https://blue-corners-kneel.loca.lt/graphql",
    headers: {
      Authorization: `Bearer 67539bba-135e-4acf-9766-20773ff714ac`,
    },
  }),
  cache,
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
