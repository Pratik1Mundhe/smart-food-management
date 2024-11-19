import React from "react";
import { blueButton, viewContainer } from "./styles";
import { VoidFunctionType } from "../../types";
import { useTranslation } from "react-i18next";

interface ScheduledMealSaveErrorViewPropsType {
  handleSaveMealSchedule: VoidFunctionType;
  tPath: string;
}

const ScheduledMealSaveErrorView: React.FC<
  ScheduledMealSaveErrorViewPropsType
> = ({ tPath, handleSaveMealSchedule }) => {
  const { t } = useTranslation();
  return (
    <div className={viewContainer}>
      <h1 className="text-xl font-semibold ">{t(tPath + "errorView.title")}</h1>
      <button onClick={handleSaveMealSchedule} className={blueButton}>
        {t(tPath + "buttons.save")}
      </button>
    </div>
  );
};

export default ScheduledMealSaveErrorView;
