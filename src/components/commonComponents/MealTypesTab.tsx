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
  mealButtonFull,
} from "./styles";
import { observer } from "mobx-react-lite";

interface MealTabProp {
  activeTab: string;
  handelActiveTab: (activeType: MealPreferenceEnum) => void;
}

const MealTypesTab: React.FC<MealTabProp> = (prop) => {
  const { activeTab, handelActiveTab } = prop;

  const fullMealButton = () => {
    return (
      <li
        className={`${mealButtonFull} ${
          activeTab === MealPreferenceEnum.FULL ? activeMealTab : fullMealTab
        }`}
        onClick={() => handelActiveTab(MealPreferenceEnum.FULL)}
      >
        Full Meal
      </li>
    );
  };

  const halfMealButton = () => {
    return (
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
    );
  };

  const customMealButton = () => {
    return (
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
    );
  };

  return (
    <ul className={mealTypes}>
      {fullMealButton()}
      {halfMealButton()}
      {customMealButton()}
    </ul>
  );
};

export default observer(MealTypesTab);
