import { observer } from "mobx-react";
import ReviewModal from "../components/reviewModal/ReviewModal";
import ModalStore from "../store/ModalStore";
import scheduledMealStore from "../store/ScheduledMealStore";
import ReviewStore from "../store/ReviewStore";
import { useEffect, useState } from "react";

interface ReviewModalControllerType {
  date: string;
}

const ReviewModalController = ({ date }: ReviewModalControllerType) => {
  const type = ModalStore.typeOfMeal;
  const mealItems = scheduledMealStore.getMealDayData(date)[type];
  const [textareaContent, setTextAreaContent] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });
  function handleTextAreaContent(content: string) {
    setTextAreaContent((preState) => {
      return { ...preState, [type]: content };
    });
  }
  const formattedReviewData = mealItems.map((each) => {
    return {
      id: each.id,
      name: each.name,
      quality: 0,
      taste: 0,
    };
  });
  useEffect(() => {
    ReviewStore.setReview(type, formattedReviewData);
  }, [type]);
  const reviewItems = ReviewStore.reviewsOfMealType[type];
  return (
    <>
      <ReviewModal
        items={reviewItems}
        review={textareaContent[type]}
        handleTextAreaContent={handleTextAreaContent}
      />
    </>
  );
};
export default observer(ReviewModalController);
