import React from "react";
import { v4 } from "uuid";

import { MEAL_TYPES } from "../../constants";
import { MealTypeEnum } from "../../types";
import { activeTabStyle, inActiveTabStyle } from "./styles";

interface MealTabsPropsType {
  currentMealTab: string;
  handleTabChange: (meal: MealTypeEnum) => void;
}

const MealTabs: React.FC<MealTabsPropsType> = ({
  currentMealTab,
  handleTabChange,
}) => {
  return (
    <ul className="flex items-center border-2 rounded-md ">
      {MEAL_TYPES.map((meal) => {
        const style =
          currentMealTab === meal ? activeTabStyle : inActiveTabStyle;
        return (
          <li
            onClick={() => handleTabChange(meal)}
            key={v4()}
            className={style}
          >
            {meal}
          </li>
        );
      })}
    </ul>
  );
};

export default MealTabs;
