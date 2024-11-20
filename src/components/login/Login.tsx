import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import Input from "../commonComponents/Input";
import Loader from "../loader/Loader";
import { PageRoutesEnum, ReactElementType } from "../../types";
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
  INVALID_USERNAME_RESPONSE,
  INVALID_PASSWORD_RESPONSE,
  ACCESS_TOKEN,
  ADMIN_TOKEN,
  USER_TOKEN,
  LOGIN_URL,
  USERNAME_KEY,
} from "../../constants";

interface LoginDataType {
  username: string;
  password: string;
}

interface LoginInvalidDetailsType {
  isUsernameInvalid: boolean;
  isPasswordInvalid: boolean;
}

const Login: React.FC = () => {
  const [loginDetails, setLoginDetails] = useState<LoginDataType>({
    username: USERNAME_INITIAL_VALUE,
    password: PASSWORD_INITIAL_VALUE,
  });

  const [isLoginDetailsInvalid, setIsLoginDetailsInvalid] =
    useState<LoginInvalidDetailsType>({
      isUsernameInvalid: false,
      isPasswordInvalid: false,
    });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  function handleLoginDetails(
    updatingValue: string,
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const newValue: string = event.target.value;

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
      const response = await fetch(LOGIN_URL, {
        method: LOGIN_URL,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
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
          addItemLocalStorage(USERNAME_KEY, "admin");
          addItemLocalStorage(
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

  const headerSection: ReactElementType = () => (
    <>
      <img src={GLOBAL_LOGO_URL} className={logo} alt={GLOBAL_LOGO_ALT} />
      <h1 className={heading}>
        Hi there, <br />
        login
      </h1>
    </>
  );

  const inputsSection: ReactElementType = () => (
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
