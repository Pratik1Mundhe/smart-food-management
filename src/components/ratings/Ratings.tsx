import MealRatingAndReviewModel from "../../models/MealRatingAndReviewModel";
import MealRating from "./MealRating";
import { observer } from "mobx-react";

interface RatingType {
  activeMealTab: MealRatingAndReviewModel[];
}

const Ratings: React.FC<RatingType> = (props) => {
  const { activeMealTab } = props;
  return (
    <div>
      <div className="flex flex-col gap-5">
        {activeMealTab.map((eachRating) => {
          return <MealRating eachRating={eachRating} />;
        })}
      </div>
    </div>
  );
};

export default observer(Ratings);
