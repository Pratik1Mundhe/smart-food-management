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
let accessToken = localStorage.getItem(ACCESS_TOKEN);
if (accessToken) {
  accessToken = JSON.parse(accessToken);
}
const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URL,
    headers: {
      Authorization: `Bearer a98aec44-1bec-401f-ba00-ab10b6881cae`,
    },
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
