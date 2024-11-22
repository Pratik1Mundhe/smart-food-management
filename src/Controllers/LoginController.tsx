import { useState } from "react";

import Login from "../components/login/Login";
import { PASSWORD_INITIAL_VALUE, USERNAME_INITIAL_VALUE } from "../constants";
import useLoginApi from "../utils/loginApi";

const LoginController = () => {
  const [usernameDetails, setUsernameDetails] = useState<string>(
    USERNAME_INITIAL_VALUE
  );
  const [passwordDetails, setPasswordDetails] = useState<string>(
    PASSWORD_INITIAL_VALUE
  );
  const [userNameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { triggerLogin } = useLoginApi();

  function handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
    let newValue = event.target.value.trim();
    setUsernameDetails(newValue);
    if (newValue === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  }
  function handelPassword(event: React.ChangeEvent<HTMLInputElement>) {
    let newValue = event.target.value.trim();
    setPasswordDetails(newValue);
    if (newValue === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isUserNameEmpty = usernameDetails === "";
    const isPasswordEmpty = passwordDetails === "";

    setUsernameError(isUserNameEmpty);
    setPasswordError(isPasswordEmpty);
    if (isUserNameEmpty || isPasswordEmpty) return;

    const data = {
      username: usernameDetails,
      password: passwordDetails,
    };
    await triggerLogin(data, setUsernameError, setPasswordError, setLoading);
    setLoading(true);
  }

  return (
    <Login
      userNameError={userNameError}
      usernameDetails={usernameDetails}
      handleUsername={handleUsername}
      passwordError={passwordError}
      passwordDetails={passwordDetails}
      handelPassword={handelPassword}
      handleLogin={handleLogin}
      loginLoading={loading}
    />
  );
};

export default LoginController;
