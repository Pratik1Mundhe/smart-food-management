import { useState } from "react";

import Input from "../commonComponents/Input";
import Loader from "../loader/Loader";
import {
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
import useLoginApi from "../../utils/loginApi";
import Button from "../commonComponents/Button";

const Login = () => {
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
  //Not readable, the below function

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
    //can trim while saving
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
        style={userNameError ? errorInput : input}
        inputType={USERNAME_ID}
        value={usernameDetails}
        onChangeFunction={handleUsername}
        isError={userNameError}
      />
      <Input
        label={PASSWORD_LABEL}
        id={PASSWORD}
        style={passwordError ? errorInput : input}
        inputType={PASSWORD}
        value={passwordDetails}
        isError={passwordError}
        onChangeFunction={handelPassword}
      />
    </>
  );

  return (
    <form onSubmit={handleLogin} className={loginPage}>
      <div className={loginContainer}>
        {headerSection()}
        {inputsSection()}
        <Button type="submit" disable={loading}>
          {loading ? <Loader /> : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default Login;
