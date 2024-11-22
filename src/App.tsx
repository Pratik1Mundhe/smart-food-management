import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import WeeklyMenu from "./pages/weeklyMenu/WeeklyMenu";
import AdminHome from "./pages/adminHome/AdminHome";
import AdminNavbar from "./components/adminNavbar/AdminNavbar";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterController from "./controllers/RegisterController";
import { TOASTER_POSITION } from "./constants";
import { PageRoutesEnum } from "./types";
import ProfileController from "./controllers/ProfileController";

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
        <Route
          path={PageRoutesEnum.REGISTER_PAGE}
          element={<RegisterController />}
        />
        <Route
          path={PageRoutesEnum.PROFILE_PAGE}
          element={<ProfileController />}
        />
      </Routes>
      <Toaster position={TOASTER_POSITION} reverseOrder={true} />
    </BrowserRouter>
  );
};

export default App;
