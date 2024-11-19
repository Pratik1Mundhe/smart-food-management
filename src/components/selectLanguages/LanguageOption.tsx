import React from "react";
import i18next from "i18next";

interface LanguageOptionPropsType {
  language: { value: string; name: string };
}

const LanguageOption: React.FC<LanguageOptionPropsType> = ({ language }) => {
  const currentLanguage: string = i18next.language;
  const { value, name } = language;
  return (
    <option
      value={value}
      className={`cursor-pointer bg-transparent ${
        currentLanguage === value
          ? "text-blue-600 font-semibold"
          : "text-slate-500 "
      }`}
    >
      {name}
    </option>
  );
};

export default LanguageOption;
