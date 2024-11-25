import React from "react";
import { Navigate } from "react-router-dom";
import { PageRoutesEnum } from "../../types";
import { getItemLocalStorage } from "../../utils/localStorageUtils/getItem";
import { ACCESS_TOKEN_KEY, ADMIN_TOKEN } from "../../constants";

const Home: React.FC = () => {
  const accessToken = getItemLocalStorage(ACCESS_TOKEN_KEY);
  const isAdmin = getItemLocalStorage(ADMIN_TOKEN);
  if (accessToken === null) {
    return <Navigate to={PageRoutesEnum.LOGIN_PAGE} replace />;
  }
  if (isAdmin) {
    return <Navigate to={PageRoutesEnum.ADMIN_HOME_PAGE} replace />;
  }
  return <div>Home</div>;
};

export default Home;
