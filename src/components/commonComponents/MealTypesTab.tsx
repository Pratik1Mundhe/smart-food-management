import React from "react";
import { MealPreferenceEnum } from "../../types";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const fullMealButton = () => {
    const fullMealTabStyle = `${mealButtonFull} ${
      activeTab === MealPreferenceEnum.FULL ? activeMealTab : fullMealTab
    }`;
    return (
      <li
        className={fullMealTabStyle}
        onClick={() => handelActiveTab(MealPreferenceEnum.FULL)}
      >
        {t("fullMeal")}
      </li>
    );
  };

  const halfMealButton = () => {
    const halfMealTabStyle =
      activeTab === MealPreferenceEnum.HALF ? activeMealTabHalf : halfMealTab;
    return (
      <li
        className={halfMealTabStyle}
        onClick={() => handelActiveTab(MealPreferenceEnum.HALF)}
      >
        {t("halfMeal")}
      </li>
    );
  };

  const customMealButton = () => {
    const customMealTabStyle =
      activeTab === MealPreferenceEnum.CUSTOM
        ? activeMealTabCustom
        : customMealTab;
    return (
      <li
        className={customMealTabStyle}
        onClick={() => handelActiveTab(MealPreferenceEnum.CUSTOM)}
      >
        {t("custom")}
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
