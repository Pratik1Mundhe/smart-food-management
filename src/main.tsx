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
import { ACCESS_TOKEN, GRAPHQL_URL, USER_ACCESS_TOKEN } from "./constants.ts";
let accessToken = localStorage.getItem(ACCESS_TOKEN);
if (accessToken) {
  accessToken = JSON.parse(accessToken);
}
const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${USER_ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
