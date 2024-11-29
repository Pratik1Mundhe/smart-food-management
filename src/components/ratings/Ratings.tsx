import MealRating from "./MealRating";
import dummyReviewData from "../../dummyReviewData";

const Ratings = ({ activeMealTab }) => {
  return (
    <div className="flex flex-col gap-5">
      {dummyReviewData[activeMealTab].map((eachrating) => (
        <MealRating eachRating={eachrating} />
      ))}
    </div>
  );
};

export default Ratings;
