import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../../components/login/Login";
import { ACCESS_TOKEN_KEY } from "../../constants";
import { PageRoutesEnum } from "../../types";

const LoginPage: React.FC = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const isAdmin = localStorage.getItem("admin");

  if (accessToken === null) {
    return <Login />;
  }
  if (isAdmin) {
    return <Navigate to={PageRoutesEnum.ADMIN_HOME_PAGE} replace />;
  }
  return <Navigate to={PageRoutesEnum.HOME_PAGE} replace />;
};

export default LoginPage;
