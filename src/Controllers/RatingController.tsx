import { useEffect, useState } from "react";
import { MealTypeEnum } from "../types";
import { formatDate } from "../utils/formatDate";
import RatingsAndReview from "../components/ratings/RatingsAndReviews";
import RatingAndReviewStore from "../store/RatingAndReviewStore";
import dummyReviewData from "../dummyReviewData";
import { observer } from "mobx-react";

const RatingAndReviewsController = () => {
  const [activeMealTab, setActiveMealTab] = useState(MealTypeEnum.BREAKFAST);
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const date = formatDate(activeDate).split(" ")[0];
  useEffect(() => {
    RatingAndReviewStore.setRatingData(
      dummyReviewData.date,
      dummyReviewData[activeMealTab]
    );
  }, [activeMealTab]);
  const handleTabChange = (meal: MealTypeEnum): void => {
    setActiveMealTab(meal);
  };
  return (
    <RatingsAndReview
      activeMealTab={activeMealTab}
      handleTabChange={handleTabChange}
      activeDate={activeDate}
      setActiveDate={setActiveDate}
      ratingAndReviewData={RatingAndReviewStore.ratingAndReviewData.get(date)}
    />
  );
};
export default observer(RatingAndReviewsController);
