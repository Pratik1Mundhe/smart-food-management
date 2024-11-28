import React from "react";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";

import MealTabs from "../../components/mealTabs/MealTabs";
import MealDate from "../../components/mealDate/MealDate";
import { filterMealPreferences } from "../../utils/headCountUtils/headCountUtils";
import { HeadCountPropsType, ReactElementType } from "../../types";

const HeadCount: React.FC<HeadCountPropsType> = ({
  mealData,
  currentDate,
  currentMealTab,
  setCurrentDate,
  handleTabChange,
  completedMealHeadCountData,
}) => {
  const { t } = useTranslation();
  const tPath = "pages.headCount";
  const mid = Math.floor(mealData.length / 2);
  const { full, half, custom, skip } = filterMealPreferences(mealData);

  const renderMealDateAndTab: ReactElementType = () => {
    return (
      <div className="flex justify-between items-center">
        <MealTabs
          currentMealTab={currentMealTab}
          handleTabChange={handleTabChange}
        />
        <MealDate currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </div>
    );
  };

  const renderMealItems = (start: number, end: number): React.ReactElement => {
    return (
      <ul className="flex flex-col gap-4 mt-4">
        {mealData.slice(start, end).map((meal) => {
          const { name, quantity, category } = meal;
          const { value, unit } = quantity;
          return (
            <li className="flex justify-between items-center" key={v4()}>
              <div className="w-1/2">
                <p className="text-secondary text-lg font-medium first-letter:capitalize">
                  {name}
                </p>
                <p className="text-[#B5B7C4] text-xs first-letter:capitalize">
                  {category}
                </p>
              </div>
              <div className="flex justify-end items-center gap-1 w-1/2 text-secondary font-medium">
                <p>{value}</p>
                <p>{unit}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderFullAndHalfMealsHeadCounts: ReactElementType = () => {
    return (
      <div className="w-2/5">
        <h1 className="text-left font-semibold text-black text-lg mb-4">
          {t(tPath + ".headCount")}
        </h1>
        <div className="flex justify-between items-center gap-4 mb-6">
          <p className="text-lg text-secondary font-medium">
            {t(tPath + ".mealHeadCount.fullMeal")}
          </p>
          <p className="text-xl text-secondary font-medium">{full}</p>
        </div>

        <div className="flex justify-between items-center gap-4">
          <p className="text-lg text-secondary font-medium">
            {t(tPath + ".mealHeadCount.halfMeal")}
          </p>
          <p className="text-xl text-secondary font-medium">{half}</p>
        </div>
      </div>
    );
  };

  const renderCustomAndSkipMealsHeadCounts: ReactElementType = () => {
    return (
      <div className="w-2/5">
        <h1 className="text-left font-semibold text-black text-lg mb-4">
          {t(tPath + ".headCount")}
        </h1>
        <div className="flex justify-between items-center gap-4 mb-6">
          <p className="text-lg text-secondary font-medium">
            {t(tPath + ".mealHeadCount.customMeal")}
          </p>
          <p className="text-xl text-secondary font-medium">{custom}</p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <p className="text-lg text-secondary font-medium">
            {t(tPath + ".mealHeadCount.skipMeal")}
          </p>
          <p className="text-xl text-secondary font-medium">{skip}</p>
        </div>
      </div>
    );
  };

  const renderHeadCountSummary: ReactElementType = () => {
    return (
      <div className="py-8 w-2/5">
        <h1 className="text-2xl text-[#0051CA] font-semibold mb-6">
          {t(tPath + ".summary")}
        </h1>
        <div className="flex justify-between items-center mb-3">
          <p className="font-medium text-primary text-xl">
            {t(tPath + ".mealHeadCount.totalMeal")}
          </p>
          <p className="font-medium text-secondary text-xl">
            {mealData.length}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium text-primary text-xl">
            {t(tPath + ".mealHeadCount.completedMeal")}
          </p>
          <p className="font-medium text-secondary text-xl">
            {completedMealHeadCountData}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="py-6 border-b-2">
      {renderMealDateAndTab()}
      <div className="flex items-start justify-between py-8 border-b-2">
        <div className="flex flex-col w-2/5">
          <div className="flex items-center justify-between">
            <p className="text-primary font-semibold">{t(tPath + ".items")}</p>
            <p className="text-primary font-semibold">
              {t(tPath + ".quantity")}
            </p>
          </div>
          {renderMealItems(0, mid)}
        </div>
        <div className="flex flex-col w-2/5">
          <div className="flex items-center justify-between">
            <p className="text-primary font-semibold">{t(tPath + ".items")}</p>
            <p className="text-primary font-semibold">
              {t(tPath + ".quantity")}
            </p>
          </div>
          {renderMealItems(mid, mealData.length)}
        </div>
      </div>
      <div className="flex justify-between py-8">
        {renderFullAndHalfMealsHeadCounts()}
        {renderCustomAndSkipMealsHeadCounts()}
      </div>
      {renderHeadCountSummary()}
    </div>
  );
};

export default HeadCount;
