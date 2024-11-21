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
    return (
      <li
        className={`${mealButtonFull} ${
          activeTab === MealPreferenceEnum.FULL ? activeMealTab : fullMealTab
        }`}
        onClick={() => handelActiveTab(MealPreferenceEnum.FULL)}
      >
        {t("fullMeal")}
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
        {t("halfMeal")}
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
