import RatingType from "./RatingType";

const MealRating = ({ eachRating }) => {
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
export default MealRating;
