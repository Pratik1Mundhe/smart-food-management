import { observer } from "mobx-react";

import { MealTypeEnum } from "../../types";
import MealTabs from "../mealTabs/MealTabs";
import MealDate from "../mealDate/MealDate";
import { mealTypeHeading, ratingAndReviewContainer } from "./Styles";
import Ratings from "./Ratings";
import MealRatingAndReviewModel from "../../models/MealRatingAndReviewModel";
import Review from "./Review";
import AdminReviewStore from "../../store/AdminReviewStore";

interface FoodWastageLogType {
  activeMealTab: MealTypeEnum;
  handleTabChange: (mealType: MealTypeEnum) => void;
  activeDate: Date;
  setActiveDate: React.Dispatch<React.SetStateAction<Date>>;
  ratingAndReviewData: MealRatingAndReviewModel[] | undefined;
}

const RatingsAndReview: React.FC<FoodWastageLogType> = (props) => {
  const {
    activeMealTab,
    handleTabChange,
    activeDate,
    setActiveDate,
    ratingAndReviewData,
  } = props;

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
  const renderReviewsSection = () => {
    return (
      <>
        <div className="flex flex-row justify-between my-10">
          <h1 className={mealTypeHeading}> Ratings</h1>
        </div>
        <div className="flex flex-row flex-wrap justify-between">
          {AdminReviewStore.adminReviewData[activeMealTab].map((each) => (
            <Review each={each} />
          ))}
        </div>
      </>
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
  const renderRatingOrNoRatingMsg = () => {
    if (ratingAndReviewData) {
      return (
        <>
          <Ratings activeMealTab={ratingAndReviewData} />
          {renderReviewsSection()}
        </>
      );
    }
    return <h1 className="text-3xl font-bold text-center mt-40">No Ratings</h1>;
  };
  return (
    <div className={ratingAndReviewContainer}>
      {renderMealTabs()}
      {renderPageHeadingAndDate()}
      {renderRatingOrNoRatingMsg()}
    </div>
  );
};
export default observer(RatingsAndReview);
