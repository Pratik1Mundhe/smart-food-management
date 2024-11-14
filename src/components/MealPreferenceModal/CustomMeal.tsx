import { v4 } from "uuid";
import { useState } from "react";
import { mealContainer, mealItem } from "./styles";
import MealDetailsModel from "../../models/MealDetailsModel";

interface CustomMealProp {
  eachMeal: MealDetailsModel;
  index: number;
}

const CustomMeal = (props: CustomMealProp) => {
  const { eachMeal, index } = props;

  const [mealQuantity, setMealQuantity] = useState(0);

  function handelIncreaseQuantity() {
    setMealQuantity((prvVal) => prvVal + 1);
  }
  function handelDecreaseQuantity() {
    setMealQuantity((prvVal) => prvVal - 1);
  }

  return (
    <li key={v4()} className={mealContainer}>
      <p className={mealItem}>
        {eachMeal.foodItem[index].name}
        <br />
      </p>
      <div className={`flex flex-row gap-2${mealQuantity}`}>
        <p>
          <button
            className="p-2 border-[1px] text-gray-400"
            disabled={mealQuantity === 0}
            onClick={handelDecreaseQuantity}
          >
            -
          </button>
          <span className="p-2 border-[1px] text-gray-400">{mealQuantity}</span>
          <button
            className="p-2 border-[1px] text-gray-400"
            disabled={mealQuantity >= 5}
            onClick={handelIncreaseQuantity}
          >
            +
          </button>
        </p>
        <span className="text-gray-300 text-[12px] ml-3">quantity</span>
      </div>
    </li>
  );
};

export default CustomMeal;
