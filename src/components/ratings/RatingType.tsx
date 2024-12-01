import { observer } from "mobx-react";
import RatingBar from "./Ratingbar";
import RatingModel from "../../models/ratingModel";
import { reviewCircle, reviewType } from "./Styles";
import {
  FIVE_STAR,
  FOUR_STAR,
  ONE_STAR,
  THREE_STAR,
  TWO_STAR,
} from "../../constants";

interface RatingTypes {
  type: string;
  ratings: RatingModel;
}

const RatingType: React.FC<RatingTypes> = (props) => {
  const { type, ratings } = props;
  const ratingCircle = () => {
    return (
      <div className="text-center   px-10 mr-10">
        <p className={reviewType}>{type}</p>
        <div className={reviewCircle}>
          <p className="text-black text-[32px]">{ratings.totalRating} </p>
          <p className="text-slate-800 text-[12px] text-center px-2 mr-2 font-bold w-[140px] truncate hover:text-clip">
            TOTAL :-{" "}
            <span className="truncate hover:text-clip">
              {ratings.totalMembers}
            </span>
          </p>
        </div>
      </div>
    );
  };

  const ratingBars = () => {
    return (
      <div className="flex flex-col gap-6">
        <RatingBar
          width={`${(ratings.fiveStarRating / ratings.totalMembers) * 100}%`}
          rating={ratings.fiveStarRating}
          ratingType={FIVE_STAR}
          color="bg-green-600"
        />
        <RatingBar
          width={`${(ratings.fourStarRating / ratings.totalMembers) * 100}%`}
          ratingType={FOUR_STAR}
          color="bg-green-300"
          rating={ratings.fourStarRating}
        />
        <RatingBar
          width={`${(ratings.threeStarRating / ratings.totalMembers) * 100}%`}
          ratingType={THREE_STAR}
          color="bg-yellow-400"
          rating={ratings.threeStarRating}
        />
        <RatingBar
          width={`${(ratings.twoStarRating / ratings.totalMembers) * 100}%`}
          ratingType={TWO_STAR}
          color="bg-pink-300"
          rating={ratings.twoStarRating}
        />
        <RatingBar
          width={`${(ratings.oneStarRating / ratings.totalMembers) * 100}%`}
          ratingType={ONE_STAR}
          color="bg-red-600"
          rating={ratings.oneStarRating}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-row justify-between mr-28">
      <div className=" flex flex-row gap-4 ">
        {ratingCircle()}
        {ratingBars()}
      </div>
    </div>
  );
};

export default observer(RatingType);
