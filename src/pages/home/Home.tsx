import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import UserMealCard from "../../components/userMealCard/UserMealCard";
import { MealTypeEnum, PageRoutesEnum } from "../../types";
import MealDate from "../../components/mealDate/MealDate";
import { observer } from "mobx-react-lite";
import { ACCESS_TOKEN } from "../../constants";

const Home: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const isAdmin = localStorage.getItem("admin");

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
          mealTime="5:00 - 06:00"
        />
        <UserMealCard
          currentDate={currentDate}
          type={MealTypeEnum.LUNCH}
          mealTime="13:00 - 15:00"
        />
        <UserMealCard
          currentDate={currentDate}
          type={MealTypeEnum.DINNER}
          mealTime="20:00 - 22:00"
        />
      </div>
    </div>
  );
};

export default observer(Home);
