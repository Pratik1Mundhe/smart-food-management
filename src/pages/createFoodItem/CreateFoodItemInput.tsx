import React from "react";

import { PiWarningCircle } from "react-icons/pi";
import { InputPropsType, ReactElementType } from "../../types";

const CreateFoodItemInput: React.FC<InputPropsType> = ({
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

  const renderIcon: ReactElementType = () => {
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
        className={`flex items-center focus:outline-none h-[40px] border-2 rounded appearance-none ${
          error ? "border-red-500 bg-[#FF0B370D]" : ""
        }`}
      >
        <input
          type={inputType}
          id={type}
          value={inputValue}
          onChange={handleInputChange}
          name={type}
          placeholder="Please enter food name"
          className={`h-[40px] pl-4 text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-800 ${
            error ? "w-[90%]" : "w-full"
          }`}
        />
        {renderIcon()}
      </div>
    );
  };

  return (
    <div className={`w-80`}>
      {renderRegisterInput()}
      {renderInputError()}
    </div>
  );
};

export default CreateFoodItemInput;
