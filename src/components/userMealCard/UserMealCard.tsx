import React, { useState, useEffect } from "react";
import { CiClock1 } from "react-icons/ci";
import { v4 } from "uuid";

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

interface MealCardProps {
  type: MealTypeEnum;
  mealTime: string;
}

const itemsList = ["idly", "Marsala Rice", "Maggie", "rice", "Biryani"];

const UserMealCard: React.FC<MealCardProps> = (props) => {
  const { type, mealTime } = props;
  const [isEditable, setIsEditable] = useState(true);
  const [isMealAteStatus, setIsMealStatus] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const cutoff = calculateCutoffTime(mealTime.split("-")[0].trim());
      const mealCompleteTime = calculateMealCompleteTime(
        mealTime.split("-")[1].trim()
      );
      setIsEditable(now < cutoff);
      setIsMealStatus(now > mealCompleteTime);
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
    return (
      <ul className={foodItems}>
        {itemsList.map((each, index) => (
          <li
            key={v4()}
            className={`first-letter:capitalize ${mealItem} ${
              index % 2 !== 0 ? "text-right" : "text-left"
            }`}
          >
            {each}
          </li>
        ))}
      </ul>
    );
  };

  const renderEditButton = () => {
    return (
      <button
        className={isEditable ? editButton : disableEditButton}
        onClick={() => ModalStore.openModal(type)}
        disabled={!isEditable}
      >
        <p className={buttonContent}>
          <span className="text-sm">Edit</span>
          <CiClock1
            className="text-xl
          "
          />
          <span className="font-light text-sm">Left</span>
        </p>
      </button>
    );
  };

  const mealStatusButtons = () => {
    if (isMealAteStatus) {
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

  return (
    <div className={cardContainer}>
      <MealPreferenceModal />
      {mealTypeAndTime()}
      {meals()}
      {mealStatusButtons()}
    </div>
  );
};

export default UserMealCard;
