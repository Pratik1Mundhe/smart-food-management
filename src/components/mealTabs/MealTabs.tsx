import React from "react";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";

import { MEAL_TYPES } from "../../constants";
import { MealTabsPropsType } from "../../types";
import { tabStyle } from "./styles";

const MealTabs: React.FC<MealTabsPropsType> = ({
  currentMealTab,
  handleTabChange,
}) => {
  const { t } = useTranslation();
  const tPath = "pages.adminHome.scheduleMeal.mealTabs";
  return (
    <ul className="flex items-center border-2 rounded-md">
      {MEAL_TYPES.map((meal) => {
        return (
          <li
            onClick={() => handleTabChange(meal)}
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
      })}
    </ul>
  );
};

export default MealTabs;
