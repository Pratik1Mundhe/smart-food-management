import { useState } from "react";

import Login from "../components/login/Login";
import {
  EMPTY_PASSWORD_ERROR_MSG,
  EMPTY_USERNAME_ERROR_MSG,
} from "../constants";
import useLoginApi from "../utils/loginApi";

const LoginController = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userNameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const { triggerLogin, loading } = useLoginApi();

  function handleUsername(value: string) {
    let newValue = value.trim();
    setUsername(newValue);
    if (newValue === "") {
      setUsernameError(EMPTY_USERNAME_ERROR_MSG);
    } else {
      setUsernameError("");
    }
  }
  function handelPassword(value: string) {
    let newValue = value.trim();
    setPassword(newValue);
    if (newValue === "") {
      setPasswordError(EMPTY_PASSWORD_ERROR_MSG);
    } else {
      setPasswordError("");
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isUserNameEmpty = username === "";
    const isPasswordEmpty = password === "";

    setUsernameError(EMPTY_USERNAME_ERROR_MSG);
    setPasswordError(EMPTY_PASSWORD_ERROR_MSG);
    if (isUserNameEmpty || isPasswordEmpty) return;

    const data = {
      username: username,
      password: password,
    };
    await triggerLogin(data, setUsernameError, setPasswordError);
  }

  return (
    <Login
      userNameError={userNameError}
      username={username}
      handleUsername={handleUsername}
      passwordError={passwordError}
      password={password}
      handelPassword={handelPassword}
      handleLogin={handleLogin}
      loginLoading={loading}
    />
  );
};

export default LoginController;
