import React from "react";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";

import { MEAL_TYPES } from "../../constants";
import { MealTabsPropsType, MealTypeEnum } from "../../types";
import { tabStyle } from "./styles";

const MealTabs: React.FC<MealTabsPropsType> = ({
  currentMealTab,
  handleTabChange,
}) => {
  const { t } = useTranslation();
  const tPath = "pages.adminHome.scheduleMeal.mealTabs";

  const renderMealTab = (meal: MealTypeEnum) => {
    const handleClickTab = () => {
      handleTabChange(meal);
    };
    return (
      <li
        onClick={handleClickTab}
        key={v4()}
        className={`${tabStyle} ${
          currentMealTab === meal
            ? "bg-primary text-white"
            : "bg-transparent text-black"
        }`}
      >
        {t(tPath + `.${meal}`)}
      </li>
    );
  };

  return (
    <ul className="flex items-center border-2 rounded-md">
      {MEAL_TYPES.map((meal) => {
        return renderMealTab(meal);
      })}
    </ul>
  );
};

export default MealTabs;
