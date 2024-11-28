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
  function handelCloseModal() {
    ModalStore.closeReviewModalModal();
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
    if (ReviewStore.reviewsOfMealType[type].length === 0) {
      ReviewStore.setReviewOnDate(date, type, formattedReviewData);
    }
  }, [type, formattedReviewData.length]);
  if (!ReviewStore.getReviewMealsOnDate(date)) return;
  const reviewItems = ReviewStore.getReviewMealsOnDate(date)[type];

  return (
    <>
      <ReviewModal
        items={reviewItems}
        review={textareaContent[type]}
        handleTextAreaContent={handleTextAreaContent}
        handelCloseModal={handelCloseModal}
      />
    </>
  );
};
export default observer(ReviewModalController);
