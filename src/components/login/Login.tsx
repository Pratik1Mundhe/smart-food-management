import { useState } from "react";

import Input from "../commonComponents/Input";
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

  function handleLoginDetails(
    updatingValue: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newValue = event.target.value;
    setLoginDetails((previousState) => ({
      ...previousState,
      [updatingValue]: newValue,
    }));

    const isValidUsername =
      updatingValue === USERNAME && newValue !== USERNAME_INITIAL_VALUE;
    const isValidPassword =
      updatingValue === PASSWORD && newValue !== PASSWORD_INITIAL_VALUE;

    if (isValidUsername) {
      setIsLoginDetailsInvalid((prev) => ({
        ...prev,
        isUsernameInvalid: false,
      }));
    }
    if (isValidPassword) {
      setIsLoginDetailsInvalid((prev) => ({
        ...prev,
        isPasswordInvalid: false,
      }));
    }
  }

  function handleLogin() {
    const isUserNameEmpty = loginDetails.username.trim() === "";
    const isPasswordEmpty = loginDetails.password.trim() === "";

    setIsLoginDetailsInvalid({
      isUsernameInvalid: isUserNameEmpty,
      isPasswordInvalid: isPasswordEmpty,
    });
  }
  const headerSection = () => {
    return (
      <>
        <img src={GLOBAL_LOGO_URL} className={logo} alt={GLOBAL_LOGO_ALT} />
        <h1 className={heading}>
          Hi there, <br />
          login
        </h1>
      </>
    );
  };
  const inputsSection = () => {
    return (
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
  };

  return (
    <div className={loginPage}>
      <div className={loginContainer}>
        {headerSection()}
        {inputsSection()}
        <button className={button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
