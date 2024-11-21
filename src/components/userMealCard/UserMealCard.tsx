import React from "react";
import { CiClock1 } from "react-icons/ci";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import IconMeal from "../iconMeal/IconMeal";
import Loader from "../loader/Loader";
import UserMealStore from "../../store/UserMealStore";
import Button from "../commonComponents/Button";
import {
  MealCardProps,
  MealPreferenceEnum,
  ReactElementType,
} from "../../types";
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
import MealPreferenceController from "../../Controllers/MealPreferenceController";

const UserMealCard: React.FC<MealCardProps> = ({
  mealType,
  mealItems,
  mealTime,
  action,
  fetchScheduleMealStatus,
}) => {
  const { t } = useTranslation();
  const mealTypeAndTime: ReactElementType = () => {
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
  const mealPreference: ReactElementType = () => {
    const preferenceStyle =
      UserMealStore.mealPreference[mealType] === MealPreferenceEnum.CUSTOM
        ? customMeals
        : halfFullMeals;
    const fullOrHalfMeal =
      UserMealStore.mealPreference[mealType] === MealPreferenceEnum.FULL
        ? t("fullMeal")
        : t("halfMeal");
    return (
      <>
        {UserMealStore.mealPreference[mealType] ? (
          <p className={preferenceStyle}>
            {UserMealStore.mealPreference[mealType] === "custom"
              ? t("custom")
              : fullOrHalfMeal}
          </p>
        ) : undefined}
      </>
    );
  };
  const headerSection: ReactElementType = () => {
    return (
      <div className={header}>
        {mealTypeAndTime()}
        {mealPreference()}
      </div>
    );
  };
  const mealsEmptyContent: ReactElementType = () => {
    return (
      <div className="flex items-center justify-center my-auto">
        <h1 className="font-semibold text-slate-800">{t("emptyMeal")}</h1>
      </div>
    );
  };
  const meals: ReactElementType = () => {
    return (
      <>
        {mealItems.map((item, index) => {
          const { id, name } = item;
          const alignment = index % 2 !== 0 ? "text-right" : "text-left";

          return (
            <li key={id} className={`${mealItem} ${alignment}`}>
              {name}
            </li>
          );
        })}
      </>
    );
  };
  const mealsContainer: ReactElementType = () => {
    if (mealItems.length === 0) {
      return mealsEmptyContent();
    }
    return (
      <ul className={foodItems}>
        {meals()}
        <div className={mealButtonsContainer}>{mealStatusButtons()}</div>
      </ul>
    );
  };
  const editButtonContent: ReactElementType = () => {
    return (
      <>
        <span>{t("edit")}</span>
        <CiClock1 className="text-sm" />
        <span className="font-thin text-sm">{t("left")}</span>
      </>
    );
  };
  const editButton: ReactElementType = () => {
    const editAction = action.find((action) => action.type === "EDIT");

    if (!editAction) return <></>;
    return (
      <>
        <Button
          isEditable={editAction.isDisable && UserMealStore.inCampusStatus}
          onClick={editAction.onClick}
          disable={!editAction.isDisable}
        >
          <div className={buttonContent}>{editButtonContent()}</div>
        </Button>
      </>
    );
  };
  const mealStatusButtons: ReactElementType = () => {
    if (action[1].isHidden && UserMealStore.inCampusStatus) {
      if (action[1].isDisable) {
        return <Loader color="blue" />;
      }
      return (
        <p className=" absolute top-[360px] flex self-center gap-6">
          <Button skip onClick={() => action[1].onClick}>
            {t("iAte")}
          </Button>
          <Button outline onClick={() => action[2].onClick}>
            {t("iSkip")}
          </Button>
        </p>
      );
    }
    return <div className="absolute top-[360px]">{editButton()}</div>;
  };

  const cardContent = (): JSX.Element => {
    if (fetchScheduleMealStatus) {
      return fetchScheduleMealStatus;
    }
    return (
      <>
        {headerSection()}
        {mealsContainer()}
      </>
    );
  };
  return (
    <div className={cardContainer}>
      <MealPreferenceController />
      {cardContent()}
    </div>
  );
};

export default observer(UserMealCard);
