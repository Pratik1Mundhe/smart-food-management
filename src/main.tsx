import { createRoot } from "react-dom/client";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";

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
      Authorization: `Bearer ${accessToken}`,
    },
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </I18nextProvider>
);
