import { useState } from "react";
import { observer } from "mobx-react";

import { MealTypeEnum } from "../types";
import FoodWastageLog from "../components/foodWastageLog/FoodWastageLog";
import { formatDate } from "../utils/formatDate";
import wastageData from "../dummyFoodWastageData";
import FoodWastageStore from "../store/FoodWastageStore";

const FoodWasteAgeLogController: React.FC = () => {
  const [currentMealTab, setCurrentMealTab] = useState(MealTypeEnum.BREAKFAST);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const date = formatDate(currentDate);
  if (FoodWastageStore.foodWastageOnMealType[currentMealTab] === null) {
    FoodWastageStore.setFoodWastageOnMealType(
      wastageData[currentMealTab],
      currentMealTab,
      date
    );
  }
  const mealWastageData = FoodWastageStore.foodWastageOnDate.get(date);

  const handleTabChange = (meal: MealTypeEnum): void => {
    setCurrentMealTab(meal);
  };

  function handelFoodPrepared(value: number | string) {
    mealWastageData[currentMealTab].setTotalFoodPrepared(Number(value));
    console.log(mealWastageData[currentMealTab].totalFoodPrepared);
  }

  function handelFoodWasted(value: number | string) {
    const isPreparedGreaterThanWasted =
      value > mealWastageData[currentMealTab].totalFoodPrepared;
    if (isPreparedGreaterThanWasted) {
      mealWastageData[currentMealTab].setTotalFoodWasted(
        mealWastageData[currentMealTab].totalFoodPrepared
      );
    } else {
      mealWastageData[currentMealTab].setTotalFoodWasted(Number(value));
    }
  }

  return (
    <FoodWastageLog
      currentMealTab={currentMealTab}
      handleTabChange={handleTabChange}
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
      mealWastageData={mealWastageData}
      handelFoodPrepared={handelFoodPrepared}
      handelFoodWasted={handelFoodWasted}
    />
  );
};

export default observer(FoodWasteAgeLogController);
