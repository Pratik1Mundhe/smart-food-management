import { createRoot } from "react-dom/client";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import "./index.css";
import App from "./App.tsx";
import { ACCESS_TOKEN, BACKEND_URL } from "./constants.ts";
let accessToken = localStorage.getItem(ACCESS_TOKEN);
if (accessToken) {
  accessToken = JSON.parse(accessToken);
}
const client = new ApolloClient({
  link: new HttpLink({
    uri: BACKEND_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
