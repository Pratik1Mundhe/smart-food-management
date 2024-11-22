import React from "react";
import { useTranslation } from "react-i18next";

import {
  PasswordStrengthBarPropsType,
  PasswordStrengthEnum,
  ReactElementType,
} from "../../types";

const PasswordStrengthBar: React.FC<PasswordStrengthBarPropsType> = ({
  passwordStrength,
}) => {
  const { t } = useTranslation();
  const tPath = "pages.register.passwordStrength";

  const isWeakStrengthPassword = passwordStrength || PasswordStrengthEnum.WEAK;
  const isMediumStrengthPassword =
    passwordStrength === PasswordStrengthEnum.MEDIUM ||
    passwordStrength === PasswordStrengthEnum.STRONG;
  const isStrongStrengthPassword =
    passwordStrength === PasswordStrengthEnum.STRONG;

  const renderWeakBar: ReactElementType = () => {
    if (isWeakStrengthPassword) {
      return (
        <div
          className={`h-[3px] rounded-l-lg last:rounded-r-lg bg-error transition-all duration-300 ${
            isWeakStrengthPassword ? "w-1/4" : "w-0"
          }`}
        ></div>
      );
    }
    return <></>;
  };
  const renderMediumBar: ReactElementType = () => {
    if (isMediumStrengthPassword) {
      return (
        <div
          className={`h-[3px] last:rounded-r-lg bg-warning transition-all duration-300 ease-in-out transform-cpu ${
            isMediumStrengthPassword ? "w-1/2" : "w-0"
          }`}
        ></div>
      );
    }
    return <></>;
  };
  const renderStrongBar: ReactElementType = () => {
    if (isStrongStrengthPassword) {
      return (
        <div
          className={`h-[3px]  last:rounded-r-lg bg-success transition-all duration-300 ${
            isStrongStrengthPassword ? "w-1/4" : "w-0"
          }`}
        ></div>
      );
    }
    return <></>;
  };

  return (
    <div className="w-full h-[3px] mb-6 flex items-center">
      <p className="text-xs text-secondary">{t(tPath + ".weak")}</p>
      <div className="h-[3px] flex-grow flex items-center mx-2">
        {renderWeakBar()}
        {renderMediumBar()}
        {renderStrongBar()}
      </div>
      <p className="text-xs text-secondary">{t(tPath + ".strong")}</p>
    </div>
  );
};

export default PasswordStrengthBar;
