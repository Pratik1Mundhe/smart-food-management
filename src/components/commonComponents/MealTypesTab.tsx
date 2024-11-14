import React from "react";
import { MealPreferenceEnum } from "../../types";
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
  handelActiveTab: (activeType: MealPreferenceEnum) => void;
}

const MealTypesTab: React.FC<MealTabProp> = (prop) => {
  const { activeTab, handelActiveTab } = prop;
  return (
    <ul className={mealTypes}>
      <li
        className={`px-3 py-2 transition-all duration-500 border-gray-300 ${
          activeTab === MealPreferenceEnum.FULL ? activeMealTab : fullMealTab
        }`}
        onClick={() => handelActiveTab(MealPreferenceEnum.FULL)}
      >
        Full Meal
      </li>
      <li
        className={
          activeTab === MealPreferenceEnum.HALF
            ? activeMealTabHalf
            : halfMealTab
        }
        onClick={() => handelActiveTab(MealPreferenceEnum.HALF)}
      >
        Half Meal
      </li>
      <li
        className={
          activeTab === MealPreferenceEnum.CUSTOM
            ? activeMealTabCustom
            : customMealTab
        }
        onClick={() => handelActiveTab(MealPreferenceEnum.CUSTOM)}
      >
        Custom
      </li>
    </ul>
  );
};

export default MealTypesTab;
