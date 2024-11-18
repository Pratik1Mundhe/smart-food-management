import React, { useState, useEffect } from "react";
import { CiClock1 } from "react-icons/ci";
import { observer } from "mobx-react";

import calculateCutoffTime from "../../utils/calculateCutoffTime";
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
import { MealTypeEnum } from "../../types";
import IconMeal from "../iconMeal/IconMeal";
import calculateMealCompleteTime from "../../utils/calculateMealCompletedTime";
import Loader from "../loader/Loader";
import foodItemsStore from "../../store/FoodItemsStore";

import { formatDate } from "../../utils/formatDate";
import useFetchScheduledMeal from "../../apis/queries/getScheduledMeal/useFetchScheduledMeal";
import scheduledMealStore from "../../store/ScheduledMealStore";

interface MealCardProps {
  type: MealTypeEnum;
  mealTime: string;
  currentDate: Date;
}

const UserMealCard: React.FC<MealCardProps> = ({
  type,
  mealTime,
  currentDate,
}) => {
  const [isEditable, setIsEditable] = useState(true);
  const [isMealAteStatus, setIsMealStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const date = formatDate(currentDate);

  const { mealsLoading, error } = useFetchScheduledMeal(
    date,
    type.toUpperCase()
  );

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

  const mealTypeAndTime = () => {
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

  const meals = () => {
    const mealItems = scheduledMealStore.getMealData(type, date)?.items;
    if (!mealItems) {
      return (
        <div className="flex items-center justify-center my-auto">
          <h1 className="font-semibold text-slate-800">Meal plan is empty</h1>
        </div>
      );
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
      </ul>
    );
  };
  const renderEditButton = () => {
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

  const mealStatusButtons = () => {
    if (isMealAteStatus && foodItemsStore.inCampusStatus) {
      return (
        <p className="flex self-center gap-6">
          <button className="text-sm px-5 py-2 bg-blue-600 rounded-sm text-white  hover:bg-blue-700 mt-8">
            I Ate it
          </button>
          <button className="text-sm px-5 py-2 border-2 border-gray-300  rounded hover:bg-gray-100  mt-8">
            I Skipped
          </button>
        </p>
      );
    }
    return renderEditButton();
  };

  const renderCardContent = () => {
    if (mealsLoading) {
      return <Loader color="blue" height={40} width={40} radius={4} />;
    }
    return (
      <>
        {mealTypeAndTime()}
        {meals()}
        {mealStatusButtons()}
      </>
    );
  };

  return (
    <div className={cardContainer}>
      <MealPreferenceModal />
      {renderCardContent()}
    </div>
  );
};

export default observer(UserMealCard);
