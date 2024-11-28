import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { ReactElementType, SelectInputPropsType } from "../../types";

const SelectInput: React.FC<SelectInputPropsType> = ({
  type,
  options,
  inputValue,
  error,
  handleInputChange,
  tPath,
}) => {
  const { t } = useTranslation();

  const renderInputError: ReactElementType = () => {
    if (error) {
      return <p className="text-error text-xs italic mt-2">{error}</p>;
    }
    return <></>;
  };

  const renderSelectInput: ReactElementType = () => {
    const selectOption = t(tPath).toLowerCase();
    return (
      <select
        name={type}
        value={inputValue}
        onChange={handleInputChange}
        className={`border-2 text-sm pl-4 appearance-none rounded h-[46px] text-slate-800 outline-none w-full ${
          error ? "border-red-500 bg-[#FF0B370D]" : ""
        }`}
      >
        <option value={""}>Please select {selectOption}</option>
        {options.map((option) => {
          const formatOption = option[0].toUpperCase() + option.slice(1);
          return (
            <option key={option} value={option}>
              {formatOption}
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <>
      <div className="relative flex flex-col gap-1 ">
        {renderSelectInput()}
        <button
          className={
            "pointer-events-none absolute top-4 right-3 flex items-center text-slate-600"
          }
        >
          <FiChevronDown className="w-5 h-5" />
        </button>
      </div>
      {renderInputError()}
    </>
  );
};

export default SelectInput;
