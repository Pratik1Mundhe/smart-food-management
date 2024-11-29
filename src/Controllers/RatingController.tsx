import { useEffect, useState } from "react";
import { MealTypeEnum } from "../types";
import { formatDate } from "../utils/formatDate";
import RatingsAndReview from "../components/ratings/RatingsAndReviews";
import RatingAndReviewStore from "../store/RatingAndReviewStore";
import dummyReviewData from "../dummyReviewData";

const RatingAndReviewsController = () => {
  const [activeMealTab, setActiveMealTab] = useState(MealTypeEnum.BREAKFAST);
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const date = formatDate(activeDate);

  useEffect(() => {
    RatingAndReviewStore.setRatingData(date, dummyReviewData[activeMealTab][0]);
  }, [activeMealTab]);
  const handleTabChange = (meal: MealTypeEnum): void => {
    setActiveMealTab(meal);
  };
  console.log(RatingAndReviewStore.ratingAndReviewData.get(date));

  return (
    <RatingsAndReview
      activeMealTab={activeMealTab}
      handleTabChange={handleTabChange}
      activeDate={activeDate}
      setActiveDate={setActiveDate}
    />
  );
};
export default RatingAndReviewsController;
