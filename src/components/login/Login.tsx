import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../commonComponents/Input";
import Loader from "../loader/Loader";
import { PageRoutesEnum } from "../../types";
import { addItemLocalStorage } from "../../utils/localStorageUtils/addItem";
import { successToast } from "../../utils/toastUtils/successToast";
import { failureToast } from "../../utils/toastUtils/failureToast";
import {
  button,
  errorInput,
  heading,
  input,
  loginContainer,
  loginPage,
  logo,
} from "./styles";
import {
  USERNAME_INITIAL_VALUE,
  PASSWORD_INITIAL_VALUE,
  USERNAME,
  PASSWORD,
  GLOBAL_LOGO_URL,
  GLOBAL_LOGO_ALT,
  USERNAME_LABEL,
  USERNAME_ID,
  PASSWORD_LABEL,
  LOGIN_METHOD,
  INVALID_USERNAME_RESPONSE,
  INVALID_PASSWORD_RESPONSE,
  ACCESS_TOKEN,
  ADMIN_TOKEN,
  USER_TOKEN,
} from "../../constants";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: USERNAME_INITIAL_VALUE,
    password: PASSWORD_INITIAL_VALUE,
  });
  const [isLoginDetailsInvalid, setIsLoginDetailsInvalid] = useState({
    isUsernameInvalid: false,
    isPasswordInvalid: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLoginDetails(
    updatingValue: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newValue = event.target.value;
    setLoginDetails((previousState) => ({
      ...previousState,
      [updatingValue]: newValue,
    }));

    if (updatingValue === USERNAME && newValue.trim() !== "") {
      setIsLoginDetailsInvalid((prev) => ({
        ...prev,
        isUsernameInvalid: false,
      }));
    }
    if (updatingValue === PASSWORD && newValue.trim() !== "") {
      setIsLoginDetailsInvalid((prev) => ({
        ...prev,
        isPasswordInvalid: false,
      }));
    }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isUserNameEmpty = loginDetails.username.trim() === "";
    const isPasswordEmpty = loginDetails.password.trim() === "";

    setIsLoginDetailsInvalid({
      isUsernameInvalid: isUserNameEmpty,
      isPasswordInvalid: isPasswordEmpty,
    });

    if (isUserNameEmpty || isPasswordEmpty) return;

    const data = {
      username: loginDetails.username,
      password: loginDetails.password,
    };

    setLoading(true);

    try {
      const response = await fetch(
        "https://free-meals-say.loca.lt/api/meals/login/",
        {
          method: LOGIN_METHOD,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result.status_code === 200) {
        if (result.response.is_admin) {
          addItemLocalStorage(ADMIN_TOKEN, result.response.is_admin);
          addItemLocalStorage(
            ACCESS_TOKEN,
            JSON.stringify(result.response.access_token)
          );
          navigate(PageRoutesEnum.ADMIN_HOME_PAGE);
        } else {
          addItemLocalStorage(
            ACCESS_TOKEN,
            JSON.stringify(result.response.access_token)
          );
          localStorage.setItem(
            USER_TOKEN,
            JSON.stringify(result.response.user_id)
          );
          navigate(PageRoutesEnum.HOME_PAGE);
          successToast("Login Successful");
        }
      }
      if (result.status_code !== 200) {
        throw new Error(result.res_status);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === INVALID_USERNAME_RESPONSE) {
          setIsLoginDetailsInvalid({
            isUsernameInvalid: true,
            isPasswordInvalid: false,
          });
        } else if (err.message === INVALID_PASSWORD_RESPONSE) {
          setIsLoginDetailsInvalid({
            isUsernameInvalid: false,
            isPasswordInvalid: true,
          });
        } else {
          failureToast("Failed to Login");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  const headerSection = () => (
    <>
      <img src={GLOBAL_LOGO_URL} className={logo} alt={GLOBAL_LOGO_ALT} />
      <h1 className={heading}>
        Hi there, <br />
        login
      </h1>
    </>
  );

  const inputsSection = () => (
    <>
      <Input
        label={USERNAME_LABEL}
        id={USERNAME}
        style={isLoginDetailsInvalid.isUsernameInvalid ? errorInput : input}
        inputType={USERNAME_ID}
        value={loginDetails.username}
        onChangeFunction={(event) => handleLoginDetails(USERNAME, event)}
        isError={isLoginDetailsInvalid.isUsernameInvalid}
      />
      <Input
        label={PASSWORD_LABEL}
        id={PASSWORD}
        style={isLoginDetailsInvalid.isPasswordInvalid ? errorInput : input}
        inputType={PASSWORD}
        value={loginDetails.password}
        isError={isLoginDetailsInvalid.isPasswordInvalid}
        onChangeFunction={(event) => handleLoginDetails(PASSWORD, event)}
      />
    </>
  );

  return (
    <form onSubmit={handleLogin} className={loginPage}>
      <div className={loginContainer}>
        {headerSection()}
        {inputsSection()}
        <button type="submit" className={button} disabled={loading}>
          {loading ? <Loader /> : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Login;
