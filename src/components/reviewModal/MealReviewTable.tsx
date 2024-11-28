import { observer } from "mobx-react";
import ReviewModel from "../../models/ReviewModel";
import ReviewStars from "./ReviewStars";

interface MealReviewTableType {
  items: ReviewModel[];
}
const renderTableHeader = () => {
  return (
    <thead>
      <tr className="flex ml-52 flex-row gap-28 items-center mt-5 mb-4">
        <th className="text-[18px] font-normal ml-1">Quality</th>
        <th className="text-[18px] font-normal ml-1">Taste</th>
      </tr>
    </thead>
  );
};

const tableMealRatingRow = (eachReview: ReviewModel) => {
  return (
    <tr className="flex flex-row gap-16 items-center">
      <td className="text-[14px] w-[130px] text-gray-400">{eachReview.name}</td>
      <ReviewStars
        rating={eachReview.quality}
        handleSetNewValue={eachReview.setQuality}
      />
      <ReviewStars
        rating={eachReview.taste}
        handleSetNewValue={eachReview.setTaste}
      />
    </tr>
  );
};

const MealReviewTable: React.FC<MealReviewTableType> = (props) => {
  const { items } = props;
  return (
    <table className=" mb-10">
      {renderTableHeader()}
      <tbody className="flex flex-col gap-5">
        {items.map((eachReview) => tableMealRatingRow(eachReview))}
      </tbody>
    </table>
  );
};
export default observer(MealReviewTable);
