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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  async function handleLogin() {
    const isUserNameEmpty = loginDetails.username.trim() === "";
    const isPasswordEmpty = loginDetails.password.trim() === "";

    setIsLoginDetailsInvalid({
      isUsernameInvalid: isUserNameEmpty,
      isPasswordInvalid: isPasswordEmpty,
    });

    if (isUserNameEmpty || isPasswordEmpty) {
      setError("Please fill in all fields.");
      return;
    }

    const data = {
      username: loginDetails.username,
      password: loginDetails.password,
    };

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://great-clouds-rule.loca.lt/api/meals/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const result = await response.json();
      console.log("Login successful:", result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
        {error && <p className="text-red-500 text-[12px]">{error}</p>}{" "}
        <button className={button} onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
