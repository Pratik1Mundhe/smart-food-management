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

interface MealCardProps {
  type: MealTypeEnum;
  mealTime: string;
}

const itemsList = ["idly", "Marsala Rice", "Maggie", "rice", "Biryani"];

const UserMealCard: React.FC<MealCardProps> = (props) => {
  const { type, mealTime } = props;
  const [isEditable, setIsEditable] = useState(true);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     const cutoff = calculateCutoffTime(mealTime.split("-")[0].trim());
  //     setIsEditable(now < cutoff);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const mealTypeAndTime = () => {
    return (
      <div className={header}>
        <div className={timeDetailsContainer}>
          <IconMeal mealType={type} />
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

  const editButtonContainer = () => {
    return (
      <button
        className={isEditable ? editButton : disableEditButton}
        onClick={() => ModalStore.openModal(type)}
        disabled={!isEditable}
      >
        <p className={buttonContent}>
          <span>Edit</span>{" "}
          <CiClock1
            className="text-sm
          "
          />{" "}
          <span className="font-thin text-[14px]">Left</span>
        </p>
      </button>
    );
  };

  return (
    <div className={cardContainer}>
      <MealPreferenceModal />
      {mealTypeAndTime()}
      {meals()}
      {editButtonContainer()}
    </div>
  );
};

export default UserMealCard;
