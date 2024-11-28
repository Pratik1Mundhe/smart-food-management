import React from "react";
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
  const renderInputError: ReactElementType = () => {
    if (error) {
      return <p className="text-error text-xs italic mt-3">{error}</p>;
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

  const renderInput: ReactElementType = () => {
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
        <button type="button" className="w-[10%] outline-none">
          {renderIcon()}
        </button>
      </div>
    );
  };

  return (
    <>
      {renderInput()}
      {renderInputError()}
    </>
  );
};

export default PasswordInput;
