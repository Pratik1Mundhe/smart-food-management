import { observer } from "mobx-react";
import { LuUserCircle } from "react-icons/lu";
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
      <div className="w-[300px] h-[6px] bg-slate-300 rounded-full flex flex-col gap-1">
        <p
          className={` h-[100%] ${color} rounded-full`}
          style={{ width: width }}
        ></p>
      </div>
      <p className="flex flex-row gap-2 text-[9px] font-semibold ml-3 mt-2  items-center">
        <LuUserCircle className="h-3 w-3" /> <b>{rating}</b>{" "}
        <p className="text-gray-400">{ratingType}</p>
      </p>
    </div>
  );
};
export default observer(RatingBar);
