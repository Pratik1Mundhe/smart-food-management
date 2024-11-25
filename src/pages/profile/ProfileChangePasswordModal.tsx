import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Modal from "../../components/modal/Modal";
import IdmLogo from "../../icons/idmLogo";
import PasswordStrengthBar from "../../components/passwordStrengthBar/PasswordStrengthBar";
import PasswordInput from "./PasswordInput";
import {
  ProfileChangePasswordModalPropsType,
  ProfilePasswordFormDataType,
  ReactElementType,
  RenderInputElementType,
  VoidFunctionType,
} from "../../types";
import {
  MINIMUM_PASSWORD_LENGTH,
  PROFILE_INPUT_NAMES,
  PROFILE_INPUT_TYPES,
} from "../../constants";
import Input from "../../components/inputComponents/Input";

const ProfileChangePasswordModal: React.FC<
  ProfileChangePasswordModalPropsType
> = ({
  handleCloseChangePasswordModal,
  handlePasswordInputChange,
  passwordErrors,
  passwordFormData,
  passwordStrength,
  handleSubmitUpdatedPassword,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { t } = useTranslation();
  const tPath = "pages.profile.changePasswordModal";

  const renderPasswordStrengthBar: ReactElementType = () => {
    const { password } = passwordFormData;
    if (password.length >= MINIMUM_PASSWORD_LENGTH) {
      return <PasswordStrengthBar passwordStrength={passwordStrength} />;
    }
    return <></>;
  };

  const handleToggleShowPassword: VoidFunctionType = () => {
    setShowPassword(!showPassword);
  };

  const renderPasswordInputField: RenderInputElementType = (
    type,
    inputType
  ) => {
    const { passwordError } = passwordErrors;
    const inputValue =
      passwordFormData[type as keyof ProfilePasswordFormDataType];
    return (
      <PasswordInput
        type={type}
        inputType={inputType}
        handleInputChange={handlePasswordInputChange}
        error={passwordError}
        inputValue={inputValue}
        showPassword={showPassword}
        handleToggleShowPassword={handleToggleShowPassword}
      />
    );
  };

  const renderConfirmPasswordInputField: RenderInputElementType = (
    type,
    inputType
  ) => {
    const { confirmPasswordError } = passwordErrors;
    const inputValue =
      passwordFormData[type as keyof ProfilePasswordFormDataType];
    return (
      <Input
        type={type}
        inputType={inputType}
        handleInputChange={handlePasswordInputChange}
        error={confirmPasswordError}
        inputValue={inputValue}
        tPath="pages.profile.changePasswordModal"
      />
    );
  };

  return (
    <Modal close={handleCloseChangePasswordModal}>
      <form
        onSubmit={handleSubmitUpdatedPassword}
        className="flex flex-col min-w-[400px]"
      >
        <IdmLogo />
        <div className="mt-6 flex flex-col mb-4">
          {renderPasswordInputField(
            PROFILE_INPUT_NAMES.password,
            PROFILE_INPUT_TYPES.password
          )}
          {renderPasswordStrengthBar()}
          {renderConfirmPasswordInputField(
            PROFILE_INPUT_NAMES.confirmPassword,
            PROFILE_INPUT_TYPES.password
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-5 py-2 rounded"
        >
          {t(tPath + ".buttons.changePassword")}
        </button>
      </form>
    </Modal>
  );
};

export default ProfileChangePasswordModal;
