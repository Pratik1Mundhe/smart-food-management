import React from "react";
import { CiClock1 } from "react-icons/ci";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import IconMeal from "../iconMeal/IconMeal";
import Loader from "../loader/Loader";
import UserMealStore from "../../store/UserMealStore";
import Button from "../commonComponents/Button";
import MealPreferenceController from "../../Controllers/MealPreferenceController";
import { MealCardProps, MealPreferenceEnum } from "../../types";
import {
  buttonContent,
  cardContainer,
  customMeals,
  foodItems,
  halfFullMeals,
  header,
  mealButtonsContainer,
  mealItem,
  time,
  timeDetailsContainer,
} from "./styles";

const UserMealCard: React.FC<MealCardProps> = (props) => {
  const { mealType, mealItems, mealTime, actions, fetchScheduleMealStatus } =
    props;
  const { t } = useTranslation();

  const mealTypeAndTime = (): JSX.Element => {
    return (
      <div className={timeDetailsContainer}>
        <div className="border-2 p-2 rounded-sm">
          <IconMeal mealType={mealType} />
        </div>
        <p className="flex flex-col">
          <span className="text-lg first-letter:capitalize">
            {t(`${mealType}`)}
          </span>
          <span className={time}>{mealTime}</span>
        </p>
      </div>
    );
  };

  const mealPreference = (): JSX.Element => {
    const userPreference = UserMealStore.mealPreference[mealType];
    const isCustom = userPreference === MealPreferenceEnum.CUSTOM;
    const isFull = userPreference === MealPreferenceEnum.FULL;
    const fullOrHalfMeal = isFull ? t("fullMeal") : t("halfMeal");
    if (isCustom) {
      return <p className={customMeals}>{t("custom")}</p>;
    }
    return <p className={halfFullMeals}>{fullOrHalfMeal}</p>;
  };
  const mealPreferenceContainer = (): JSX.Element | null => {
    const userPreference = UserMealStore.mealPreference[mealType];
    if (userPreference) {
      return mealPreference();
    }
    return null;
  };

  const headerContainer = (): JSX.Element => {
    return (
      <div className={header}>
        {mealTypeAndTime()}
        {mealPreferenceContainer()}
      </div>
    );
  };

  const mealsNotScheduleMessage = (): JSX.Element => {
    return (
      <div className="flex items-center justify-center my-auto">
        <h1 className="font-semibold text-slate-800">{t("emptyMeal")}</h1>
      </div>
    );
  };

  const meals = (): JSX.Element => {
    return (
      <>
        {mealItems.map((item, index) => {
          const { id, name } = item;
          const mealNameAlignment =
            index % 2 !== 0 ? "text-right" : "text-left";
          return (
            <li key={id} className={`${mealItem} ${mealNameAlignment}`}>
              {name}
            </li>
          );
        })}
      </>
    );
  };
  //is Name Fit
  const mealsContainer = (): JSX.Element => {
    if (mealItems.length === 0) {
      return mealsNotScheduleMessage();
    }
    return (
      <ul className={foodItems}>
        {meals()}
        <div className={mealButtonsContainer}>{mealActionButtons()}</div>
      </ul>
    );
  };

  const editButtonContent = (): JSX.Element => {
    return (
      <>
        <span>{t("edit")}</span>
        <CiClock1 className="text-sm" />
        <span className="font-thin text-sm">{t("left")}</span>
      </>
    );
  };
  const editButton = (): JSX.Element => {
    return (
      <>
        <Button
          isEditable={actions.edit.isDisable && UserMealStore.inCampusStatus}
          onClick={actions.edit.onClick}
          disable={!actions.edit.isDisable}
        >
          <div className={buttonContent}>{editButtonContent()}</div>
        </Button>
      </>
    );
  };

  const mealStatusButtons = (): JSX.Element => {
    if (actions.skip.isDisable) {
      return <Loader color="blue" />;
    }
    return (
      <p className=" absolute top-[360px] flex self-center gap-6">
        <Button skip onClick={() => actions.ate.onClick}>
          {t("iAte")}
        </Button>
        <Button outline onClick={() => actions.skip.onClick}>
          {t("iSkip")}
        </Button>
      </p>
    );
  };

  const mealActionButtons = (): JSX.Element => {
    const showStatusButtons =
      actions.skip.isMealTimeCompleted && UserMealStore.inCampusStatus;
    if (showStatusButtons) {
      {
        mealStatusButtons();
      }
    }
    return <div className="absolute top-[360px]">{editButton()}</div>;
  };

  const mealCard = (): JSX.Element => {
    if (fetchScheduleMealStatus) {
      return fetchScheduleMealStatus;
    }
    return (
      <>
        {headerContainer()}
        {mealsContainer()}
      </>
    );
  };
  return (
    <div className={cardContainer}>
      <MealPreferenceController />
      {mealCard()}
    </div>
  );
};

export default observer(UserMealCard);
