import React from "react";
import { v4 } from "uuid";

import { MEAL_TYPES } from "../../constants";
import { MealTypeEnum } from "../../types";
import { tabStyle } from "./styles";

interface MealTabsPropsType {
  currentMealTab: string;
  handleTabChange: (meal: MealTypeEnum) => void;
}

const MealTabs: React.FC<MealTabsPropsType> = ({
  currentMealTab,
  handleTabChange,
}) => {
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
            {meal}
          </li>
        );
      })}
    </ul>
  );
};

export default MealTabs;
