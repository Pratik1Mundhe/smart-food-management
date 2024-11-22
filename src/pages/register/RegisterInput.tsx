import React from "react";

import { PiWarningCircle } from "react-icons/pi";
import { REGISTER_INPUT_NAMES } from "../../constants";
import { ReactElementType, RegisterInputPropsType } from "../../types";

const RegisterInput: React.FC<RegisterInputPropsType> = ({
  type,
  inputType,
  handleInputChange,
  error,
  inputValue,
}) => {
  const labelText =
    type === REGISTER_INPUT_NAMES.confirmPassword
      ? "CONFIRM PASSWORD"
      : type.toUpperCase();

  const renderInputError: ReactElementType = () => {
    if (error) {
      return <p className="text-error text-xs italic mt-2">{error}</p>;
    }
    return <></>;
  };

  const renderWarningIcon: ReactElementType = () => {
    if (error) {
      return (
        <div className="w-[10%]">
          <PiWarningCircle className="text-error text-xl" />
        </div>
      );
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
          type={inputType}
          id={type}
          value={inputValue}
          onChange={handleInputChange}
          name={type}
          className={`h-[40px] pl-4 text-gray-700 bg-transparent outline-none ${
            error ? "w-[90%]" : "w-full"
          }`}
        />
        {renderWarningIcon()}
      </div>
    );
  };

  const renderInputLabel: ReactElementType = () => {
    return (
      <label
        htmlFor="username"
        className="block text-secondary text-xs font-semibold mb-2"
      >
        {labelText}
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

export default RegisterInput;
