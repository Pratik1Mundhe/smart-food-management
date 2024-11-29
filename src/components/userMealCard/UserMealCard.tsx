import React, { useState, useEffect } from "react";
import { CiClock1 } from "react-icons/ci";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import IconMeal from "../iconMeal/IconMeal";
import calculateMealCompleteTime from "../../utils/calculateMealCompletedTime";
import Loader from "../loader/Loader";
import scheduledMealStore from "../../store/ScheduledMealStore";
import calculateCutoffTime from "../../utils/calculateCutoffTime";
import {
  MealCardProps,
  MealPreferenceEnum,
  ReactElementType,
} from "../../types";
import {
  buttonContent,
  cardContainer,
  customMeal,
  disableEditButton,
  editButton,
  foodItems,
  halfFullMeals,
  header,
  mealItem,
  skipMeal,
  time,
  timeDetailsContainer,
} from "./styles";

const UserMealCard: React.FC<MealCardProps> = ({
  type,
  mealTime,
  currentDate,
  userPreference,
}) => {
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [isMealAteStatus, setIsMealStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const tPath = "pages.home.userMealCard";

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const cutoff = calculateCutoffTime(mealTime.split("-")[0].trim());
      const mealCompleteTime = calculateMealCompleteTime(
        mealTime.split("-")[1].trim()
      );
      setIsEditable(now < cutoff);
      setIsMealStatus(now > mealCompleteTime);
      setLoading(false);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderMealPreference = (
    userPreference: MealPreferenceEnum
  ): React.ReactElement => {
    if (!userPreference) return <></>;
    switch (userPreference) {
      case MealPreferenceEnum.CUSTOM:
        return <p className={customMeal}>{t(tPath + ".custom")}</p>;
      case MealPreferenceEnum.FULL:
        return <p className={halfFullMeals}>{t(tPath + ".fullMeal")}</p>;
      case MealPreferenceEnum.HALF:
        return <div className={halfFullMeals}>{t(tPath + ".halfMeal")}</div>;
      case MealPreferenceEnum.SKIP:
        return <p className={skipMeal}>{t(tPath + ".skipMeal")}</p>;
      default:
        return <></>;
    }
  };

  const mealTypeAndTime: ReactElementType = () => {
    return (
      <div className={header}>
        <div className={timeDetailsContainer}>
          <div className="border-2 p-2 rounded-sm">
            <IconMeal mealType={type} />
          </div>
          <p className="flex flex-col">
            <span className="text-lg first-letter:capitalize">
              {t(tPath + `.${type}`)}
            </span>
            <span className={time}>{mealTime}</span>
          </p>
        </div>
        {renderMealPreference(userPreference)}
      </div>
    );
  };

  const renderMealsEmptyView: ReactElementType = () => {
    return (
      <div className="flex items-center justify-center h-[160px]">
        <h1 className="font-semibold text-slate-800">{t(tPath + ".empty")}</h1>
      </div>
    );
  };

  const meals: ReactElementType = () => {
    const mealItems = scheduledMealStore.getMealDayData(currentDate)[type];

    if (mealItems.length === 0) {
      return renderMealsEmptyView();
    }
    return (
      <ul className={foodItems}>
        {mealItems.map((item, index) => {
          const { id, name } = item;
          return (
            <li
              className={`w-1/2 h-fit first-letter:capitalize ${mealItem} ${
                index % 2 !== 0 ? "text-right" : "text-left"
              }`}
              key={id}
            >
              {name}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderEditButton: ReactElementType = () => {
    return (
      <button
        className={isEditable ? editButton : disableEditButton}
        disabled={!isEditable}
      >
        <div className={buttonContent}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <span> {t(tPath + ".edit")}</span>
              <CiClock1 className="text-sm" />
              <span className="font-thin text-sm"> {t(tPath + ".left")}</span>
            </>
          )}
        </div>
      </button>
    );
  };

  const mealStatusButtons: ReactElementType = () => {
    if (isMealAteStatus) {
      return (
        <div className="flex self-center gap-6">
          <button className="text-sm px-5 py-2 bg-blue-600 rounded-sm text-white  hover:bg-blue-700 mt-8">
            {t(tPath + ".ateText")}
          </button>
          <button className="text-sm px-5 py-2 border-2 border-gray-300  rounded hover:bg-gray-100  mt-8">
            {t(tPath + ".skipText")}
          </button>
        </div>
      );
    }
    return renderEditButton();
  };

  return (
    <div className={cardContainer}>
      {mealTypeAndTime()}
      {meals()}
      <div className=" relative flex flex-row justify-center items-center">
        {mealStatusButtons()}
      </div>
    </div>
  );
};

export default observer(UserMealCard);
