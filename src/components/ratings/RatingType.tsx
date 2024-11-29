import RatingBar from "./Ratingbar";

const RatingType = ({ type, ratings }) => {
  return (
    <div className="flex flex-row justify-between mr-28">
      <div className=" flex flex-row gap-4 ">
        <div className="text-center   px-10 mr-10">
          <p className="text-[16px] text-blue-700 font-bold mb-8">{type}</p>
          <div className="w-[140px] h-[140px] rounded-full border-[6px] p-6 border-green-300">
            <p className="text-black text-[32px]">4.7 </p>
            <p className="text-slate-800 text-[12px] font-bold">
              TOTAL :- {ratings.totalMembers}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <RatingBar
            rating={ratings.fiveStarRating}
            ratingType="fiveStarRating"
            color="bg-green-600"
            width={`${(ratings.fiveStarRating / ratings.totalMembers) * 100}%`}
          />
          <RatingBar
            width={`${(ratings.fourStarRating / ratings.totalMembers) * 100}%`}
            ratingType="fourStarRating"
            color="bg-green-300"
            rating={ratings.fourStarRating}
          />
          <RatingBar
            width={`${(ratings.threeStarRating / ratings.totalMembers) * 100}%`}
            ratingType="threeStarRating"
            color="bg-yellow-400"
            rating={ratings.threeStarRating}
          />
          <RatingBar
            width={`${(ratings.twoStarRating / ratings.totalMembers) * 100}%`}
            ratingType="twoStarRating"
            color="bg-pink-300"
            rating={ratings.twoStarRating}
          />
          <RatingBar
            width={`${(ratings.oneStarRating / ratings.totalMembers) * 100}%`}
            ratingType="oneStarRating"
            color="bg-red-600"
            rating={ratings.oneStarRating}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingType;
