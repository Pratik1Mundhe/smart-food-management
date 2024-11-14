import Login from "../../components/login/Login";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";
import { PageRoutesEnum } from "../../types";

const LoginPage = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  console.log(accessToken);

  if (accessToken === null) {
    console.log(accessToken);
    return <Login />;
  }
  return <Navigate to={PageRoutesEnum.HOME_PAGE} replace />;
};

export default LoginPage;
