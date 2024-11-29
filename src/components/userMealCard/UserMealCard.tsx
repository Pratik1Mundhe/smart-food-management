import React from "react";
import { CiClock1 } from "react-icons/ci";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import IconMeal from "../iconMeal/IconMeal";
import Loader from "../loader/Loader";
import UserMealStore from "../../store/UserMealStore";
import Button from "../commonComponents/Button";
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
import ModalStore from "../../store/ModalStore";

const UserMealCard: React.FC<MealCardProps> = (props) => {
  const {
    mealType,
    mealItems,
    mealTime,
    actions,
    userPreference,
    fetchScheduleMealStatus,
  } = props;
  const { t } = useTranslation();

  const renderMealTypeAndTime = (): JSX.Element => {
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
  const renderMealPreferences = () => {
    if (!userPreference) return null;

    switch (userPreference) {
      case MealPreferenceEnum.CUSTOM:
        return <p className={customMeals}>{t("custom")}</p>;
      case MealPreferenceEnum.FULL:
        return <p className={halfFullMeals}>{t("fullMeal")}</p>;
      case MealPreferenceEnum.HALF:
        return <p className={halfFullMeals}>{t("halfMeal")}</p>;
      default:
        return null;
    }
  };

  const renderHeaderContainer = (): JSX.Element => {
    return (
      <div className={header}>
        {renderMealTypeAndTime()}
        {renderMealPreferences()}
      </div>
    );
  };

  const renderMealsNotScheduleMessage = (): JSX.Element => {
    return (
      <div className="flex items-center justify-center my-auto">
        <h1 className="font-semibold text-slate-800">{t("emptyMeal")}</h1>
      </div>
    );
  };
  const renderMeals = (): JSX.Element => {
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
  const renderMealsContainer = (): JSX.Element => {
    if (mealItems.length === 0) {
      return renderMealsNotScheduleMessage();
    }
    return (
      <ul className={foodItems}>
        {renderMeals()}
        <div className={mealButtonsContainer}>{renderMealActionButtons()}</div>
      </ul>
    );
  };

  const renderEditButtonContent = (): JSX.Element => {
    return (
      <>
        <span>{t("edit")}</span>
        <CiClock1 className="text-sm" />
        <span className="font-thin text-sm">{t("left")}</span>
      </>
    );
  };
  const renderEditButton = (): JSX.Element => {
    return (
      <>
        <Button
          filled
          color="bg-blue-500"
          height="h-[35px]"
          width="w-[300px]"
          hoverColor="hover:bg-blue-600"
          onClick={actions.edit.onClick}
          disable={!actions.edit.isDisable || !UserMealStore.inCampusStatus}
        >
          <div className={buttonContent}>{renderEditButtonContent()}</div>
        </Button>
      </>
    );
  };

  const renderMealStatusButtons = (): JSX.Element => {
    if (actions.skip.isDisable && UserMealStore.mealStatus === null) {
      return <Loader color="blue" />;
    }
    return (
      <p className=" relative top-10 flex self-center gap-6">
        {/* <Button filled onClick={actions.ate.onClick} color="bg-blue-500">
          {t("iAte")}
        </Button>
        <Button outline onClick={actions.skip.onClick}>
          {t("iSkip")}
        </Button> */}
        <Button
          outline
          onClick={() => ModalStore.openReviewModalModal(mealType)}
        >
          {t("reviewFood")}
        </Button>
      </p>
    );
  };

  const renderMealActionButtons = () => {
    const showStatusButtons =
      actions.skip.isMealTimeCompleted && UserMealStore.inCampusStatus;
    if (showStatusButtons) {
      return renderMealStatusButtons();
    }
    return <div className="relative top-10">{renderEditButton()}</div>;
  };

  const renderSuccessView = () => (
    <>
      {renderHeaderContainer()}
      {renderMealsContainer()}
    </>
  );

  const renderMealCard = (): JSX.Element => {
    return fetchScheduleMealStatus(renderSuccessView);
  };
  return <div className={cardContainer}>{renderMealCard()}</div>;
};

export default observer(UserMealCard);
