import React from "react";
import { MealQuantityEnum } from "../../types";
import {
  mealTypes,
  fullMealTab,
  halfMealTab,
  customMealTab,
  activeMealTab,
  activeMealTabHalf,
  activeMealTabCustom,
} from "./styles";

interface MealTabProp {
  activeTab: string;
  handelActiveTab: (activeType: MealQuantityEnum) => void;
}

const MealTypesTab: React.FC<MealTabProp> = (prop) => {
  const { activeTab, handelActiveTab } = prop;
  return (
    <ul className={mealTypes}>
      <li
        className={`px-3 py-2 transition-all duration-500 border-gray-300 ${
          activeTab === MealQuantityEnum.FULL ? activeMealTab : fullMealTab
        }`}
        onClick={() => handelActiveTab(MealQuantityEnum.FULL)}
      >
        Full Meal
      </li>
      <li
        className={
          activeTab === MealQuantityEnum.HALF ? activeMealTabHalf : halfMealTab
        }
        onClick={() => handelActiveTab(MealQuantityEnum.HALF)}
      >
        Half Meal
      </li>
      <li
        className={
          activeTab === MealQuantityEnum.CUSTOM
            ? activeMealTabCustom
            : customMealTab
        }
        onClick={() => handelActiveTab(MealQuantityEnum.CUSTOM)}
      >
        Custom
      </li>
    </ul>
  );
};

export default MealTypesTab;
