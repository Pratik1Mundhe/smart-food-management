import React from "react";
import { MealTypes } from "../../types";
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
  handelActiveTab: (activeType: MealTypes) => void;
}

const MealTypesTab: React.FC<MealTabProp> = (prop) => {
  const { activeTab, handelActiveTab } = prop;

  const fullMealButton = () => {
    const fullMealTabStyle = `${mealButtonFull} ${
      activeTab === MealTypes.ALL ? activeMealTab : fullMealTab
    }`;
    return (
      <li
        className={fullMealTabStyle}
        onClick={() => handelActiveTab(MealTypes.ALL)}
      >
        All
      </li>
    );
  };

  const halfMealButton = () => {
    const halfMealTabStyle =
      activeTab === MealTypes.BREAKFAST ? activeMealTabHalf : halfMealTab;
    return (
      <li
        className={halfMealTabStyle}
        onClick={() => handelActiveTab(MealTypes.BREAKFAST)}
      >
        Breakfast
      </li>
    );
  };

  const customMealButton = () => {
    const customMealTabStyle =
      activeTab === MealTypes.LUNCH ? activeMealTabCustom : halfMealTab;
    return (
      <li
        className={customMealTabStyle}
        onClick={() => handelActiveTab(MealTypes.LUNCH)}
      >
        Lunch
      </li>
    );
  };
  const dinnerMealButton = () => {
    const customMealTabStyle =
      activeTab === MealTypes.DINNER ? activeMealTabCustom : customMealTab;
    return (
      <li
        className={customMealTabStyle}
        onClick={() => handelActiveTab(MealTypes.DINNER)}
      >
        Dinner
      </li>
    );
  };

  return (
    <ul className={mealTypes}>
      {fullMealButton()}
      {halfMealButton()}
      {customMealButton()}
      {dinnerMealButton()}
    </ul>
  );
};

export default observer(MealTypesTab);
