import { useNavigate } from "react-router-dom";
import {
  ACCESS_TOKEN,
  ADMIN_TOKEN,
  INVALID_PASSWORD_RESPONSE,
  INVALID_USERNAME_RESPONSE,
  SUCCESS_STATUS,
  LOADING_STATUS,
  LOGIN_METHOD,
  LOGIN_URL,
  INVALID_USERNAME_ERROR_MSG,
  INVALID_PASSWORD_ERROR_MSG,
} from "../constants";
import { addItemLocalStorage } from "./localStorageUtils/addItem";
import { successToast } from "./toastUtils/successToast";
import { failureToast } from "./toastUtils/failureToast";
import { PageRoutesEnum } from "../types";
import { useState } from "react";

function useLoginApi() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function triggerLogin(
    data: { username: string; password: string },
    setUsernameError: React.Dispatch<React.SetStateAction<string | null>>,
    setPasswordError: React.Dispatch<React.SetStateAction<string | null>>
  ) {
    try {
      setLoading(true);
      const response = await fetch(LOGIN_URL, {
        method: LOGIN_METHOD,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      //After LoginSuccess
      if (result.status_code === SUCCESS_STATUS) {
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
          navigate(PageRoutesEnum.HOME_PAGE);
          successToast("Login Successful");
        }
      }
      //If Any Error In Login
      if (
        result.status_code !== SUCCESS_STATUS &&
        result.status_code !== LOADING_STATUS
      ) {
        throw new Error(result.res_status);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === INVALID_USERNAME_RESPONSE) {
          setUsernameError(INVALID_USERNAME_ERROR_MSG);
        } else if (err.message === INVALID_PASSWORD_RESPONSE) {
          setPasswordError(INVALID_PASSWORD_ERROR_MSG);
        } else {
          failureToast("Failed to Login");
        }
      }
    } finally {
      // Making Loading false
      setLoading(false);
    }
  }
  return { triggerLogin, loading };
}

export default useLoginApi;
