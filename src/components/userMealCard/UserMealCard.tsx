import React, { useState, useEffect } from "react";
import { CiClock1 } from "react-icons/ci";
import { observer } from "mobx-react";

import calculateCutoffTime from "../../utils/timeUtils/calculateCutoffTime";
import MealPreferenceModal from "../MealPreferenceModal/MealPreferenceModal";
import {
  buttonContent,
  cardContainer,
  disableEditButton,
  editButton,
  foodItems,
  halfMeals,
  header,
  mealItem,
  time,
  timeDetailsContainer,
} from "./styles";
import ModalStore from "../../store/ModalStore";
import { MealCardProps, ReactElementType, VoidFunctionType } from "../../types";
import IconMeal from "../iconMeal/IconMeal";
import calculateMealCompleteTime from "../../utils/timeUtils/calculateMealCompletedTime";
import Loader from "../loader/Loader";
import foodItemsStore from "../../store/FoodItemsStore";
import { MealStatusEnum } from "../../types";
import { formatDate } from "../../utils/formatDate";
import useFetchScheduledMeal from "../../apis/queries/GetMealScheduled/useFetchScheduledMeal";
import scheduledMealStore from "../../store/ScheduledMealStore";
import useSaveMealStatus from "../../apis/mutations/SaveDayMealStatus/useSaveMealStatus";

const UserMealCard: React.FC<MealCardProps> = ({
  type,
  mealTime,
  currentDate,
}) => {
  const [isEditable, setIsEditable] = useState(true);
  const [isMealAteStatus, setIsMealStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const date = formatDate(currentDate);

  const { mealsLoading, error, refetch } = useFetchScheduledMeal(
    date,
    type.toUpperCase()
  );
  const {
    triggerSaveMealStatue,
    loading: saveStatusLoading,
    error: saveStatusError,
  } = useSaveMealStatus();

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

  const mealTypeAndTime: ReactElementType = () => {
    return (
      <div className={header}>
        <div className={timeDetailsContainer}>
          <div className="border-2 p-2 rounded-sm">
            <IconMeal mealType={type} />
          </div>
          <p className="flex flex-col">
            <span className="text-lg first-letter:capitalize">{type}</span>
            <span className={time}>{mealTime}</span>
          </p>
        </div>
        <p className={halfMeals}>Half Meal</p>
      </div>
    );
  };

  const renderMealsEmptyView: ReactElementType = () => {
    return (
      <div className="flex items-center justify-center my-auto">
        <h1 className="font-semibold text-slate-800">Meal plan is empty</h1>
      </div>
    );
  };

  const meals: ReactElementType = () => {
    const mealItems = scheduledMealStore.getMealDayData(date)[type];
    if (!mealItems) {
      return renderMealsEmptyView();
    }
    return (
      <ul className={foodItems}>
        {mealItems.map((item, index) => {
          const { id, name } = item;
          return (
            <li
              key={id}
              className={`first-letter:capitalize ${mealItem} ${
                index % 2 !== 0 ? "text-right" : "text-left"
              }`}
            >
              {name}
            </li>
          );
        })}
        <div className=" relative bottom-4 h-[100%] w-[100%]  flex flex-row justify-center items-center">
          {mealStatusButtons()}
        </div>
      </ul>
    );
  };

  const renderEditButton: ReactElementType = () => {
    return (
      <button
        className={
          isEditable && foodItemsStore.inCampusStatus
            ? editButton
            : disableEditButton
        }
        onClick={() => {
          if (foodItemsStore.inCampusStatus) {
            ModalStore.openModal(type);
          }
        }}
        disabled={!isEditable}
      >
        <div className={buttonContent}>
          {loading ? (
            <Loader color="" />
          ) : (
            <>
              <span>Edit</span>
              <CiClock1 className="text-sm" />
              <span className="font-thin text-sm">Left</span>
            </>
          )}
        </div>
      </button>
    );
  };

  const mealStatusButtons: ReactElementType = () => {
    if (isMealAteStatus && foodItemsStore.inCampusStatus) {
      return (
        <p className="flex self-center gap-6">
          <button
            className="text-sm px-5 py-2 bg-blue-600 rounded-sm text-white  hover:bg-blue-700 mt-8"
            onClick={() =>
              triggerSaveMealStatue({
                status: MealStatusEnum.ATE,
              })
            }
          >
            I Ate it
          </button>
          <button
            className="text-sm px-5 py-2 border-2 border-gray-300  rounded hover:bg-gray-100  mt-8"
            onClick={() =>
              triggerSaveMealStatue({
                status: MealStatusEnum.SKIP,
              })
            }
          >
            I Skipped
          </button>
        </p>
      );
    }
    return renderEditButton();
  };

  const handleRefetchMeal: VoidFunctionType = () => {
    refetch({
      params: {
        date: date,
        mealType: type.toUpperCase(),
      },
    });
  };

  const renderMealErrorView: ReactElementType = () => {
    return (
      <div className="flex flex-col items-center justify-center my-auto">
        <h1 className="text-xl font-semibold ">Something went wrong !!!</h1>
        <button
          onClick={handleRefetchMeal}
          className="bg-primary text-sm text-white font-medium py-2 px-5 rounded-lg mt-4"
        >
          Retry
        </button>
      </div>
    );
  };

  const renderCardContent: ReactElementType = () => {
    if (error) {
      return renderMealErrorView();
    }
    if (mealsLoading) {
      return <Loader color="blue" height={40} width={40} radius={4} />;
    }
    return (
      <>
        {mealTypeAndTime()}
        {meals()}
      </>
    );
  };
  return (
    <div className={cardContainer}>
      <MealPreferenceModal date={date} />
      {renderCardContent()}
    </div>
  );
};

export default observer(UserMealCard);
