import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Profile from "../pages/profile/Profile";
import { profileValidation } from "../utils/validationUtils/profileValidation";
import validatePassword from "../utils/validationUtils/passwordValidation";
import { PROFILE_INPUT_NAMES } from "../constants";
import {
  PasswordStrengthEnum,
  ProfileErrorsType,
  ProfileFormDataType,
  ProfilePasswordErrorType,
  ProfilePasswordFormDataType,
  VoidFunctionType,
} from "../types";

const ProfileController: React.FC = () => {
  const [profileFormData, setProfileFormData] = useState<ProfileFormDataType>({
    name: "",
    profileImage: "",
    jobRole: "",
    email: "",
    department: "",
    gender: "",
  });
  const [errors, setErrors] = useState<ProfileErrorsType>({
    name: null,
    profileImage: null,
    jobRole: null,
    email: null,
    department: null,
    gender: null,
  });
  const [passwordFormData, setPasswordFormData] =
    useState<ProfilePasswordFormDataType>({
      password: "",
      confirmPassword: "",
    });
  const [passwordErrors, setPasswordErrors] =
    useState<ProfilePasswordErrorType>({
      passwordError: null,
      confirmPasswordError: null,
    });
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrengthEnum | null>(null);

  const { t } = useTranslation();

  const validateProfileField = (name: string, value: string): void => {
    const error: string | null = profileValidation(name, value, t);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  const handleFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      console.log(imageFile);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setProfileFormData({
      ...profileFormData,
      [name]: value,
    });
    validateProfileField(name, value);
  };
  const handleProfileFormValidation = (): boolean => {
    let isFormValid = true;
    Object.keys(profileFormData).forEach((key) => {
      const fieldName = key as keyof ProfileFormDataType;
      const value = profileFormData[fieldName];
      const error = profileValidation(fieldName, value, t);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
      if (error) isFormValid = false;
    });
    return isFormValid;
  };
  const handleSubmitProfile: VoidFunctionType = () => {
    if (handleProfileFormValidation()) {
      console.log("Profile submitted successfully:", profileFormData);
    } else {
      console.log("Validation failed:", errors);
    }
  };
  const handleUpdatedPasswordValidation = (
    name: string,
    value: string
  ): string | null => {
    let passwordError: string | null = null;
    let confirmPasswordError: string | null = null;
    const { password } = passwordFormData;
    switch (name) {
      case PROFILE_INPUT_NAMES.password:
        const { error, strength } = validatePassword(value, t);
        setPasswordStrength(strength);
        passwordError = error;
        break;
      case PROFILE_INPUT_NAMES.confirmPassword:
        if (password !== value || value.length === 0) {
          confirmPasswordError = "Confirm password and password must match";
        }
        break;
      default:
        break;
    }
    const hasError = passwordError || confirmPasswordError;
    setPasswordErrors((prevErrors) => ({
      ...prevErrors,
      passwordError:
        name === PROFILE_INPUT_NAMES.password
          ? passwordError
          : prevErrors.passwordError,
      confirmPasswordError:
        name === PROFILE_INPUT_NAMES.confirmPassword
          ? confirmPasswordError
          : prevErrors.confirmPasswordError,
    }));
    return hasError;
  };
  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setPasswordFormData({ ...passwordFormData, [name]: value });
    handleUpdatedPasswordValidation(name, value);
  };
  const handlePasswordFormDataValidation = (): boolean => {
    const { password, confirmPassword } = passwordFormData;
    const passwordError: string | null = handleUpdatedPasswordValidation(
      PROFILE_INPUT_NAMES.password,
      password
    );
    const confirmPasswordError: string | null = handleUpdatedPasswordValidation(
      PROFILE_INPUT_NAMES.confirmPassword,
      confirmPassword
    );
    const hasError: string | null = passwordError || confirmPasswordError;
    if (hasError) {
      return false;
    }
    return true;
  };
  const handleSubmitUpdatedPassword = (e: React.FormEvent): void => {
    e.preventDefault();
    if (handlePasswordFormDataValidation()) {
      console.log(passwordFormData);
    }
  };
  return (
    <Profile
      profileFormData={profileFormData}
      passwordStrength={passwordStrength}
      passwordFormData={passwordFormData}
      passwordErrors={passwordErrors}
      errors={errors}
      handleInputChange={handleInputChange}
      handleFileInput={handleFileInput}
      handlePasswordInputChange={handlePasswordInputChange}
      handleSubmitUpdatedPassword={handleSubmitUpdatedPassword}
      handleSubmitProfile={handleSubmitProfile}
    />
  );
};

export default ProfileController;
