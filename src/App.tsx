import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import WeeklyMenu from "./pages/weeklyMenu/WeeklyMenu";
import AdminHome from "./pages/adminHome/AdminHome";
import AdminNavbar from "./components/adminNavbar/AdminNavbar";
import { PageRoutesEnum } from "./types";
import LoginPage from "./pages/loginPage/LoginPage";

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
  return (
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
