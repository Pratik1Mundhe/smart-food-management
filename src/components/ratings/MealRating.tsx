import { observer } from "mobx-react-lite";
import RatingType from "./RatingType";
import MealRatingAndReviewModel from "../../models/MealRatingAndReviewModel";

interface MealRatingType {
  eachRating: MealRatingAndReviewModel;
}

const MealRating: React.FC<MealRatingType> = (props) => {
  const { eachRating } = props;
  return (
    <div>
      <h1 className="text-[18px] text-black font-bold">
        {eachRating.mealName}
      </h1>
      <div className="flex flex-row justify-between mt-10">
        <RatingType type="Quality" ratings={eachRating.qualityRatings} />
        <RatingType type="Taste" ratings={eachRating.tasteRatings} />
      </div>
    </div>
  );
};
export default observer(MealRating);
