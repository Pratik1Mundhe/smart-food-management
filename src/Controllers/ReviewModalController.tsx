import { observer } from "mobx-react";
import ReviewModal from "../components/reviewModal/ReviewModal";
import ModalStore from "../store/ModalStore";
import scheduledMealStore from "../store/ScheduledMealStore";
import ReviewStore from "../store/ReviewStore";
import { useEffect, useState } from "react";
import AdminReviewStore from "../store/AdminReviewStore";
import { v4 } from "uuid";

interface ReviewModalControllerType {
  date: string;
}

const ReviewModalController = ({ date }: ReviewModalControllerType) => {
  const type = ModalStore.typeOfMeal;
  const mealItems = scheduledMealStore.getMealDayData(date)[type];
  const [errorMsg, setErrorMsg] = useState("");
  const [textareaContent, setTextAreaContent] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });

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
      ReviewStore.setReviewOnDate(
        date.split(" ")[0],
        type,
        formattedReviewData
      );
    }
  }, [type, formattedReviewData.length]);

  function handleTextAreaContent(content: string) {
    setTextAreaContent((preState) => {
      return { ...preState, [type]: content };
    });
  }

  function handelCloseModal() {
    if (textareaContent[type] === "") {
      setErrorMsg("Need To Add Review");
      return;
    }
    const reviewData = {
      id: v4(),
      profilePic: "https://example.com/images/user6.jpg",
      name: "Frank White",
      review: textareaContent[type],
    };
    setErrorMsg("");
    AdminReviewStore.addReview(type, reviewData);
    ModalStore.closeReviewModalModal();
  }
  if (!ReviewStore.getReviewMealsOnDate(date.split(" ")[0])) return;
  const reviewItems = ReviewStore.getReviewMealsOnDate(date.split(" ")[0])[
    type
  ];

  return (
    <>
      <ReviewModal
        items={reviewItems}
        review={textareaContent[type]}
        handleTextAreaContent={handleTextAreaContent}
        handelCloseModal={handelCloseModal}
        errorMsg={errorMsg}
      />
    </>
  );
};
export default observer(ReviewModalController);
