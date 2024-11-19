import React from "react";
import { blueButton, viewContainer } from "./styles";
import { VoidFunctionType } from "../../types";
import { useTranslation } from "react-i18next";

interface ScheduledMealsErrorViewPropsType {
  tPath: string;
  handleRefetchScheduledMeal: VoidFunctionType;
}

const ScheduledMealsErrorView: React.FC<ScheduledMealsErrorViewPropsType> = ({
  tPath,
  handleRefetchScheduledMeal,
}) => {
  const { t } = useTranslation();
  return (
    <div className={viewContainer}>
      <h1 className="text-xl font-semibold ">{t(tPath + "errorView.title")}</h1>
      <button onClick={handleRefetchScheduledMeal} className={blueButton}>
        {t(tPath + "buttons.retry")}
      </button>
    </div>
  );
};

export default ScheduledMealsErrorView;
