import { observer } from "mobx-react";
import { ActiveStar, UnActiveStar } from "../star";

interface ReviewStarsTypes {
  rating: number;
  handleSetNewValue: (newValue: number) => void;
}

const ReviewStars: React.FC<ReviewStarsTypes> = (props) => {
  const { rating, handleSetNewValue } = props;
  const typOfStars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      typOfStars.push("ActiveStar");
    } else {
      typOfStars.push("unActiveStar");
    }
  }
  return (
    <td className="flex flex-row gap-2">
      {typOfStars.map((each, index) => {
        if (each === "ActiveStar") {
          return (
            <button onClick={() => handleSetNewValue!(index + 1)}>
              <ActiveStar />
            </button>
          );
        }
        return (
          <button onClick={() => handleSetNewValue!(index + 1)}>
            <UnActiveStar />
          </button>
        );
      })}
    </td>
  );
};

export default observer(ReviewStars);
