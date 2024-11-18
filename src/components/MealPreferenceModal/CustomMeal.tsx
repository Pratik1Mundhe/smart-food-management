import { observer } from "mobx-react-lite";

import { mealContainer, mealItem } from "./styles";
import CustomMealItemModel from "../../models/CustomMealItemModel";

interface CustomProp {
  eachMeal: CustomMealItemModel;
}

const CustomMeal = (props: CustomProp) => {
  const { eachMeal } = props;
  function handelIncreaseQuantity() {
    eachMeal.increaseCustomMeal();
  }
  function handelDecreaseQuantity() {
    eachMeal.decreaseCustomMeal();
  }

  return (
    <li key={eachMeal.id} className={mealContainer}>
      <p className={mealItem}>
        {eachMeal.name}
        <br />
      </p>
      <div className={`flex flex-row gap-2`}>
        <p>
          <button
            className="p-2 border-[1px] text-gray-400"
            disabled={eachMeal.customMealQuantity === 0}
            onClick={handelDecreaseQuantity}
          >
            -
          </button>
          <span className="p-2 border-[1px] text-gray-400">
            {eachMeal.customMealQuantity}
          </span>
          <button
            className="p-2 border-[1px] text-gray-400"
            disabled={eachMeal.customMealQuantity >= 5}
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

export default observer(CustomMeal);
