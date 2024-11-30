import { observer } from "mobx-react";
import { LuUserCircle } from "react-icons/lu";
import { ratingBarContainer, ratingDetails } from "./Styles";
interface RatingBarTypes {
  rating: number;
  ratingType: string;
  color: string;
  width: string;
}

const RatingBar: React.FC<RatingBarTypes> = (props) => {
  const { rating, ratingType, color, width } = props;
  return (
    <div>
      <div className={ratingBarContainer}>
        <p
          className={` h-[100%] ${color} rounded-full`}
          style={{ width: width }}
        ></p>
      </div>
      <p className={ratingDetails}>
        <LuUserCircle className="h-3 w-3" /> <b>{rating}</b>{" "}
        <p className="text-gray-400">{ratingType}</p>
      </p>
    </div>
  );
};
export default observer(RatingBar);
