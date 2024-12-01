import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import WeeklyMenu from "./pages/weeklyMenu/WeeklyMenu";
import AdminHome from "./pages/adminHome/AdminHome";
import AdminNavbar from "./components/adminNavbar/AdminNavbar";
import { PageRoutesEnum } from "./types";
import LoginPage from "./pages/loginPage/LoginPage";
import { TOASTER_POSITION } from "./constants";
import { ACCESS_TOKEN, GRAPHQL_URL } from "./constants.ts";
import FoodWastageLogPage from "./pages/FoodWastagePage.tsx";
import RatingAndReviewsPage from "./pages/RatingPage.tsx";

export const ComponentWrapper: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export const AdminComponentWrapper: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
};

const App: React.FC = () => {
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
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path={PageRoutesEnum.HOME_PAGE}
            element={
              <ComponentWrapper>
                <Home />
              </ComponentWrapper>
            }
          />
          <Route
            path={PageRoutesEnum.ADMIN_HOME_PAGE}
            element={
              <AdminComponentWrapper>
                <AdminHome />
              </AdminComponentWrapper>
            }
          />
          <Route path={PageRoutesEnum.LOGIN_PAGE} element={<LoginPage />} />
          <Route
            path={PageRoutesEnum.WEEKLY_MENU_PAGE}
            element={
              <ComponentWrapper>
                <WeeklyMenu />
              </ComponentWrapper>
            }
          />
          <Route
            path="/food_wastage_log"
            element={
              <AdminComponentWrapper>
                <FoodWastageLogPage />
              </AdminComponentWrapper>
            }
          />
          <Route
            path="/rating"
            element={
              <AdminComponentWrapper>
                <RatingAndReviewsPage />
              </AdminComponentWrapper>
            }
          />
        </Routes>
        <Toaster position={TOASTER_POSITION} reverseOrder={true} />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
