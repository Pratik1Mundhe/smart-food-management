import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../../components/login/Login";
import { ACCESS_TOKEN, ADMIN_TOKEN } from "../../constants";
import { PageRoutesEnum } from "../../types";

const LoginPage: React.FC = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const isAdmin = localStorage.getItem(ADMIN_TOKEN);

  if (isAdmin && accessToken) {
    return <Navigate to={PageRoutesEnum.ADMIN_HOME_PAGE} />;
  }
  if (accessToken) {
    return <Navigate to={PageRoutesEnum.HOME_PAGE} />;
  }
  return <Login />;
};

export default LoginPage;
