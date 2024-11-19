import i18next from "i18next";
import React from "react";
import { addItemLocalStorage } from "../../utils/localStorageUtils/addItem";
import { FiChevronDown } from "react-icons/fi";
import { LANGUAGES } from "../../constants";
import { v4 } from "uuid";
import LanguageOption from "./LanguageOption";

interface LanguageOptionType {
  value: string;
  name: string;
}

const SelectLanguages = () => {
  const changeLanguage = (lng: string) => i18next.changeLanguage(lng);
  const currentLanguage: string = i18next.language;

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modifiedLanguage = e.target.value;
    changeLanguage(modifiedLanguage);
    addItemLocalStorage("language", modifiedLanguage);
  };
  return (
    <div className="relative flex flex-col gap-1 self-center">
      <select
        onChange={handleChangeLanguage}
        className="border-2  text-sm px-2 py-2 appearance-none rounded-lg bg-slate-100 text-slate-500 outline-none font-medium cursor-pointer w-[140px]"
        value={currentLanguage}
      >
        {LANGUAGES.map((language: LanguageOptionType) => {
          return <LanguageOption key={v4()} language={language} />;
        })}
      </select>
      <div className="pointer-events-none absolute top-2.5 right-3 flex items-center text-slate-500 dark:text-slate-200">
        <FiChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
};

export default SelectLanguages;
