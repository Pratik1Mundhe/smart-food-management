import { ReviewModelType, ReviewTypes } from "../../types";

interface Review {
  each: ReviewModelType;
}

const Review: React.FC<Review> = ({ each }) => {
  return (
    <div className="p-6 flex flex-row gap-5 w-[650px] h-[170px] bg-white border-[1px] rounded-sm border-gray-200 mb-8">
      <p className="min-w-[40px]">
        <img src="image.png" className="h-[40px] w-[40px] rounded-full" />
      </p>
      <div className="flex flex-col gap-2">
        <p className="text-black">{each.name}</p>
        <p className="text-gray-400 text-[12px]">
          by Ashoka T • 06/20/2019 at 6:43 PM{" "}
        </p>
        <p className="text-gray-400 text-[12px]">{each.review}</p>
      </div>
    </div>
  );
};

export default Review;
