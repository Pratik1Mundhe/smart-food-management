import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Register from "../pages/register/Register";
import validatePassword from "../utils/validationUtils/passwordValidation";
import validateUsername from "../utils/validationUtils/usernameValidation";
import { REGISTER_INPUT_NAMES } from "../constants";
import { successToast } from "../utils/toastUtils/successToast";
import { failureToast } from "../utils/toastUtils/failureToast";
import { useSaveUserRegister } from "../apis/mutations/SaveUserRegister/useSaveUserRegister";
import {
  FormDataType,
  FormErrors,
  PageRoutesEnum,
  PasswordStrengthEnum,
  VoidFunctionType,
} from "../types";

const RegisterController: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    password: "",
    confirmPassword: "",
    passwordWarnings: [],
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrengthEnum | null>(null);
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();
  const tPath = "pages.register";

  const handleRegisterSuccess: VoidFunctionType = () => {
    successToast(t(tPath + ".toast.success"));
    navigate(PageRoutesEnum.HOME_PAGE);
  };

  const handleRegisterFailure = (message: string): void => {
    failureToast(message);
  };

  const { loading: registerLoading, saveRegister } = useSaveUserRegister(
    formData,
    handleRegisterSuccess,
    handleRegisterFailure
  );

  const validateUpdatedInputField = (name: string, value: string): void => {
    const { username, password, confirmPassword } = REGISTER_INPUT_NAMES;
    let fieldErrors: Partial<FormErrors> = {};
    switch (name) {
      case username:
        const error = validateUsername(value, t);
        fieldErrors.username = error;
        break;
      case password:
        const {
          error: passwordError,
          warnings: passwordWarnings,
          strength,
        } = validatePassword(value, t);
        setPasswordStrength(strength);
        fieldErrors.password = passwordError;
        fieldErrors.passwordWarnings = passwordWarnings;
        break;
      case confirmPassword:
        fieldErrors.confirmPassword =
          value !== formData.password
            ? t(tPath + ".errors.confirmPasswordError")
            : null;
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateUpdatedInputField(name, value);
  };

  const handleToggleShowPassword: VoidFunctionType = () => {
    setShowPassword(!showPassword);
  };

  const handleFormDataValidation = (): boolean => {
    const { username, password, confirmPassword } = formData;
    const usernameError = validateUsername(username, t);
    const { error: passwordError, warnings: passwordWarnings } =
      validatePassword(password, t);
    const confirmPasswordError =
      confirmPassword !== password
        ? t(tPath + ".errors.passwordErrors.confirmPasswordError")
        : null;
    setErrors({
      username: usernameError,
      password: passwordError,
      passwordWarnings,
      confirmPassword: confirmPasswordError,
    });
    const hasErros = usernameError || passwordError || confirmPasswordError;
    return !hasErros;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (handleFormDataValidation()) {
      saveRegister();
    }
  };

  return (
    <Register
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      errors={errors}
      registerLoading={registerLoading}
      passwordStrength={passwordStrength}
      handleToggleShowPassword={handleToggleShowPassword}
      showPassword={showPassword}
    />
  );
};

export default RegisterController;
