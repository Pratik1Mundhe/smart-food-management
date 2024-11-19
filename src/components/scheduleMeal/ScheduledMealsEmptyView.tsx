import React from "react";
import { blueButton, viewContainer } from "./styles";
import { useTranslation } from "react-i18next";

interface ScheduledMealsEmptyViewPropsType {
  tPath: string;
  handleShowFoodItemsModal: (value: boolean) => void;
}

const ScheduledMealsEmptyView: React.FC<ScheduledMealsEmptyViewPropsType> = ({
  tPath,
  handleShowFoodItemsModal,
}) => {
  const { t } = useTranslation();
  return (
    <div className={viewContainer}>
      <h1 className="text-general font-semibold text-xl">
        {t(tPath + "emptyView.title")}
      </h1>
      <button
        onClick={() => handleShowFoodItemsModal(true)}
        className={blueButton}
      >
        {t(tPath + "buttons.addItem")}
      </button>
    </div>
  );
};

export default ScheduledMealsEmptyView;
