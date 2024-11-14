import React from "react";
import UserMealCard from "../../components/userMealCard/UserMealCard";
import { MealTypeEnum } from "../../types";
import MealDate from "../../components/mealDate/MealDate";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col py-4">
      <div className="mx-auto mb-4">
        <MealDate />
      </div>

      <div className="flex justify-center items-center gap-4">
        <UserMealCard type={MealTypeEnum.BREAKFAST} mealTime="5:00 - 06:00" />
        <UserMealCard type={MealTypeEnum.LUNCH} mealTime="13:00 - 15:00" />
        <UserMealCard type={MealTypeEnum.DINNER} mealTime="20:00 - 22:00" />
      </div>
    </div>
  );
};

export default Home;
