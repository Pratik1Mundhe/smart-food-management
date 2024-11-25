import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { ProfileSelectInputPropsType, ReactElementType } from "../../types";
import { useTranslation } from "react-i18next";

const ProfileSelectInput: React.FC<ProfileSelectInputPropsType> = ({
  type,
  options,
  inputValue,
  error,
  handleInputChange,
}) => {
  const { t } = useTranslation();
  const tPath = "pages.profile";
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

  const renderInputError: ReactElementType = () => {
    if (error) {
      return <p className="text-error text-xs italic mt-2">{error}</p>;
    }
    return <></>;
  };

  const renderSelectInput: ReactElementType = () => {
    return (
      <select
        name={type}
        value={inputValue}
        onChange={handleInputChange}
        className={`border-2 text-sm px-2 appearance-none rounded-lg h-[46px] text-slate-800 outline-none w-full ${
          error ? "border-red-500 bg-[#FF0B370D]" : ""
        }`}
      >
        <option value={""}>Please select {type}</option>
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
    <div className="w-2/5">
      {renderInputLabel()}
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
    </div>
  );
};

export default ProfileSelectInput;
