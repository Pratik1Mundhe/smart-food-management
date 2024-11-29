import React, { useState } from "react";

import Announcements from "../../components/announcements/Announcements";
import MealDate from "../../components/mealDate/MealDate";
import UserMealCard from "../../components/userMealCard/UserMealCard";
import { BREAKFAST_TIME, DINNER_TIME, LUNCH_TIME } from "../../constants";
import {
  MealPreferenceEnum,
  MealTypeEnum,
  ReactElementType,
} from "../../types";

const Home: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const renderMealCards: ReactElementType = () => {
    return (
      <div className="flex justify-center items-center gap-4">
        <UserMealCard
          currentDate={currentDate}
          type={MealTypeEnum.BREAKFAST}
          mealTime={BREAKFAST_TIME}
          userPreference={MealPreferenceEnum.SKIP}
        />
        <UserMealCard
          currentDate={currentDate}
          type={MealTypeEnum.LUNCH}
          mealTime={LUNCH_TIME}
          userPreference={MealPreferenceEnum.FULL}
        />
        <UserMealCard
          currentDate={currentDate}
          type={MealTypeEnum.DINNER}
          mealTime={DINNER_TIME}
          userPreference={MealPreferenceEnum.CUSTOM}
        />
      </div>
    );
  };

  return (
    <>
      <Announcements />
      <div className="flex flex-col pb-8">
        <div className="my-8 mx-auto">
          <MealDate setCurrentDate={setCurrentDate} currentDate={currentDate} />
        </div>
        {renderMealCards()}
      </div>
    </>
  );
};

export default Home;
