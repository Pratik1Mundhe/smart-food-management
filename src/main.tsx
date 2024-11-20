import { createRoot } from "react-dom/client";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import "./i18n.ts"; // Import this to initialize i18n
import "./index.css";
import App from "./App.tsx";
import { ACCESS_TOKEN, GRAPHQL_URL } from "./constants.ts";
import { getItemLocalStorage } from "./utils/localStorageUtils/getItem.ts";

let accessToken = getItemLocalStorage(ACCESS_TOKEN);
if (accessToken) {
  accessToken = JSON.parse(accessToken);
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URL,
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
