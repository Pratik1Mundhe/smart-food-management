import React from "react";
import { v4 } from "uuid";

import { MEAL_TYPES } from "../../constants";
import { MealTypeEnum } from "../../types";

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
            className={`px-6 py-2 text-sm border-r-2 font-semibold text-general last:border-0 first-letter:capitalize cursor-pointer last:rounded-r first:rounded-l ${
              currentMealTab === meal
                ? `bg-primary text-white`
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
