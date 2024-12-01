import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { MealTypeEnum, PageRoutesEnum } from "../../types";
import MealPreferenceController from "../../Controllers/MealPreferenceController";
import MealDate from "../../components/mealDate/MealDate";
import {
  ACCESS_TOKEN,
  ADMIN_TOKEN,
  BREAKFAST_TIME,
  DINNER_TIME,
  LUNCH_TIME,
} from "../../constants";
import UserMealCardController from "../../Controllers/UserMealCardController";
import UserMealStore from "../../store/UserMealStore";
import { formatDate } from "../../utils/formatDate";
import ModalStore from "../../store/ModalStore";
import ReviewModalController from "../../Controllers/ReviewModalController";
import FoodWastageGraph from "../../components/foodGraphs/FoodGraphs";

const Home: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const isAdmin = localStorage.getItem(ADMIN_TOKEN);
  const date = formatDate(currentDate);
  useEffect(() => {
    UserMealStore.setDate(date);
  }, [currentDate]);
  if (accessToken === null) {
    return <Navigate to={PageRoutesEnum.LOGIN_PAGE} replace />;
  }
  if (isAdmin) {
    return <Navigate to={PageRoutesEnum.ADMIN_HOME_PAGE} replace />;
  }
  function modalFunction() {
    if (ModalStore.isModalOpen) {
      return <MealPreferenceController date={date} />;
    } else {
      return (
        <>
          <ReviewModalController date={date} />{" "}
        </>
      );
    }
  }

  return (
    <div className="flex flex-col py-4 ">
      <div className="mx-auto mb-4">
        <MealDate setCurrentDate={setCurrentDate} currentDate={currentDate} />
      </div>
      <div className="flex flex-row justify-center">
        <FoodWastageGraph />
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <UserMealCardController
          date={date}
          type={MealTypeEnum.BREAKFAST}
          mealTime={BREAKFAST_TIME}
        />
        <UserMealCardController
          date={date}
          type={MealTypeEnum.LUNCH}
          mealTime={LUNCH_TIME}
        />
        <UserMealCardController
          date={date}
          type={MealTypeEnum.DINNER}
          mealTime={DINNER_TIME}
        />
        {modalFunction()}
      </div>
    </div>
  );
};

export default observer(Home);
