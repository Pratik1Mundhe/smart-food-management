import { observer } from "mobx-react";

import { MealTypeEnum } from "../../types";
import MealTabs from "../mealTabs/MealTabs";
import MealDate from "../mealDate/MealDate";
import { mealTypeHeading } from "./Styles";
import Ratings from "./Ratings";

interface FoodWastageLogType {
  activeMealTab: MealTypeEnum;
  handleTabChange: (mealType: MealTypeEnum) => void;
  activeDate: Date;
  setActiveDate: React.Dispatch<React.SetStateAction<Date>>;
}

const RatingsAndReview: React.FC<FoodWastageLogType> = (props) => {
  const { activeMealTab, handleTabChange, activeDate, setActiveDate } = props;

  const renderMealTabs = () => {
    return (
      <div className="flex flex-row justify-between">
        <MealTabs
          currentMealTab={activeMealTab}
          handleTabChange={handleTabChange}
        />
      </div>
    );
  };
  const renderPageHeadingAndDate = () => {
    return (
      <div className="flex flex-row justify-between my-10">
        <h1 className={mealTypeHeading}>{activeMealTab} Ratings</h1>
        <MealDate currentDate={activeDate} setCurrentDate={setActiveDate} />
      </div>
    );
  };
  return (
    <div className="bg-white shadow-lg p-10 min-h-screen h-[100%]">
      {renderMealTabs()}
      {renderPageHeadingAndDate()}
      <Ratings activeMealTab={activeMealTab} />
    </div>
  );
};
export default observer(RatingsAndReview);
