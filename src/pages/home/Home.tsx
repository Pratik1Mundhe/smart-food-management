import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import UserMealCard from "../../components/userMealCard/UserMealCard";
import { MealTypeEnum, PageRoutesEnum } from "../../types";
import MealDate from "../../components/mealDate/MealDate";
import {
  ACCESS_TOKEN,
  ADMIN_TOKEN,
  BREAKFAST_TIME,
  DINNER_TIME,
  LUNCH_TIME,
} from "../../constants";

const Home: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const isAdmin = localStorage.getItem(ADMIN_TOKEN);

  if (accessToken === null && !isAdmin) {
    return <Navigate to={PageRoutesEnum.LOGIN_PAGE} replace />;
  }
  if (isAdmin) {
    return <Navigate to={PageRoutesEnum.ADMIN_HOME_PAGE} replace />;
  }

  return (
    <div className="flex flex-col py-4">
      <div className="mx-auto mb-4">
        <MealDate setCurrentDate={setCurrentDate} currentDate={currentDate} />
      </div>
      <div className="flex justify-center items-center gap-4">
        <UserMealCard
          currentDate={currentDate}
          type={MealTypeEnum.BREAKFAST}
          mealTime={BREAKFAST_TIME}
        />
        <UserMealCard
          currentDate={currentDate}
          type={MealTypeEnum.LUNCH}
          mealTime={LUNCH_TIME}
        />
        <UserMealCard
          currentDate={currentDate}
          type={MealTypeEnum.DINNER}
          mealTime={DINNER_TIME}
        />
      </div>
    </div>
  );
};

export default observer(Home);
