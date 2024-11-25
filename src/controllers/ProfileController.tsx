import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Profile from "../pages/profile/Profile";
import {
  PasswordStrengthEnum,
  ProfileErrorsType,
  ProfileFormDataType,
  ProfilePasswordErrorType,
  ProfilePasswordFormDataType,
  VoidFunctionType,
} from "../types";
import { profileValidation } from "../utils/validationUtils/profileValidation";
import validatePassword from "../utils/validationUtils/passwordValidation";
import { PROFILE_INPUT_NAMES } from "../constants";

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
  const [showSaveConfirmModal, setShowSaveConfirmModal] =
    useState<boolean>(false);
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
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
    const newErrors: ProfileErrorsType = {
      name: null,
      profileImage: null,
      jobRole: null,
      email: null,
      department: null,
      gender: null,
    };
    Object.keys(profileFormData).forEach((key) => {
      const fieldName = key as keyof ProfileFormDataType;
      const value = profileFormData[fieldName];
      const error = profileValidation(fieldName, value, t);
      newErrors[fieldName] = error;
      if (error) isFormValid = false;
    });
    setErrors(newErrors); // Update all errors in one go
    return isFormValid;
  };

  const handleProfileFormData = (): void => {
    if (handleProfileFormValidation()) {
      console.log("Profile submitted successfully:", profileFormData);
    } else {
      console.log("Validation failed:", errors);
    }
  };
  const handleCloseSaveConfirmModal: VoidFunctionType = () => {
    setShowSaveConfirmModal(false);
  };
  const handleOpenSaveConfirmModal: VoidFunctionType = () => {
    setShowSaveConfirmModal(true);
  };
  const handleSubmitProfileForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleOpenSaveConfirmModal();
  };
  const handleSubmitProfileFormData = () => {
    handleProfileFormData();
    handleCloseSaveConfirmModal();
  };

  const handleUpdatedPasswordValidation = (name: string, value: string) => {
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
        console.log([password, value]);
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
  ) => {
    const { name, value } = e.target;
    setPasswordFormData({ ...passwordFormData, [name]: value });
    handleUpdatedPasswordValidation(name, value);
  };

  const handleOpenChangePasswordModal: VoidFunctionType = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal: VoidFunctionType = () => {
    setShowChangePasswordModal(false);
  };

  const handlePasswordFormDataValidation = () => {
    const { password, confirmPassword } = passwordFormData;
    const passwordError = handleUpdatedPasswordValidation(
      PROFILE_INPUT_NAMES.password,
      password
    );
    const confirmPasswordError = handleUpdatedPasswordValidation(
      PROFILE_INPUT_NAMES.confirmPassword,
      confirmPassword
    );
    const hasError = passwordError || confirmPasswordError;
    if (hasError) {
      return false;
    }
    return true;
  };

  const handleSubmitUpdatedPassword = (e: React.FormEvent) => {
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
      showChangePasswordModal={showChangePasswordModal}
      errors={errors}
      passwordErrors={passwordErrors}
      handleInputChange={handleInputChange}
      handleSubmitProfileFormData={handleSubmitProfileFormData}
      handleFileInput={handleFileInput}
      handleCloseSaveConfirmModal={handleCloseSaveConfirmModal}
      showSaveConfirmModal={showSaveConfirmModal}
      handleSubmitProfileForm={handleSubmitProfileForm}
      handlePasswordInputChange={handlePasswordInputChange}
      handleOpenChangePasswordModal={handleOpenChangePasswordModal}
      handleCloseChangePasswordModal={handleCloseChangePasswordModal}
      handleSubmitUpdatedPassword={handleSubmitUpdatedPassword}
    />
  );
};

export default ProfileController;
