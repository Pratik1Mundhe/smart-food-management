import React from "react";
import { useTranslation } from "react-i18next";
import { PiWarningCircle } from "react-icons/pi";

import { ReactElementType, RegisterPasswordInputPropsType } from "../../types";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { PROFILE_INPUT_TYPES } from "../../constants";

const PasswordInput: React.FC<RegisterPasswordInputPropsType> = ({
  type,
  handleInputChange,
  error,
  inputValue,
  showPassword,
  handleToggleShowPassword,
}) => {
  const { t } = useTranslation();
  const tPath = "pages.profile.changePasswordModal";

  const renderInputError: ReactElementType = () => {
    if (error) {
      return <p className="text-error text-xs italic mt-2">{error}</p>;
    }
    return <></>;
  };

  const renderIcon: ReactElementType = () => {
    if (error) {
      return <PiWarningCircle className="text-error text-xl" />;
    }
    if (showPassword && type === "password") {
      return <VscEyeClosed onClick={handleToggleShowPassword} />;
    }
    if (!showPassword && type === "password") {
      return <VscEye onClick={handleToggleShowPassword} />;
    }
    return <></>;
  };

  const renderRegisterInput: ReactElementType = () => {
    return (
      <div
        className={`flex items-center focus:outline-none h-[40px] border rounded shadow appearance-none ${
          error ? "border-red-500 bg-[#FF0B370D]" : ""
        }`}
      >
        <input
          type={
            showPassword
              ? PROFILE_INPUT_TYPES.text
              : PROFILE_INPUT_TYPES.password
          }
          id={type}
          value={inputValue}
          onChange={handleInputChange}
          name={type}
          className={`h-[40px] pl-4 text-gray-700 bg-transparent outline-none w-[90%]`}
        />
        <button className="w-[10%]">{renderIcon()}</button>
      </div>
    );
  };

  const renderInputLabel: ReactElementType = () => {
    return (
      <label
        htmlFor="username"
        className="block text-secondary text-xs font-semibold mb-2"
      >
        {t(tPath + `.labels.${type}`)}
      </label>
    );
  };

  return (
    <div className={`${error && error?.length > 0 ? "mb-3" : "mb-6"}`}>
      {renderInputLabel()}
      {renderRegisterInput()}
      {renderInputError()}
    </div>
  );
};

export default PasswordInput;
