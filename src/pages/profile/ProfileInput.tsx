import React from "react";
import { PiWarningCircle } from "react-icons/pi";

import { ProfileInputPropsType, ReactElementType } from "../../types";

const ProfileInput: React.FC<ProfileInputPropsType> = ({
  type,
  inputType,
  handleInputChange,
  error,
  inputValue,
}) => {
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

  const renderInput: ReactElementType = () => {
    return (
      <div
        className={`flex items-center focus:outline-none h-[40px] border-2 rounded  appearance-none ${
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
        {type.toUpperCase()}
      </label>
    );
  };

  return (
    <div className={`w-2/5`}>
      {renderInputLabel()}
      {renderInput()}
      {renderInputError()}
    </div>
  );
};

export default ProfileInput;
