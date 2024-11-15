import { v4 } from "uuid";
import {
  mealContainer,
  mealsCustomContainer,
  mealsContainer,
  mealItem,
  mealType,
  mealQuantity,
} from "./styles";

interface MealsPropsType {
  meals: {
    item: string;
    itemType: string;
    half: number;
    full: number;
    custom: number;
  }[];
  activeTab: string;
}

const Meals: React.FC<MealsPropsType> = ({ meals, activeTab }) => {
  if (activeTab === "custom") {
    return (
      <ul className={mealsCustomContainer}>
        {meals.map((eachMeal) => {
          const quantity = eachMeal.custom;
          return (
            <li key={v4()} className={mealContainer}>
              <p className={mealItem}>
                {eachMeal.item}
                <br />
                <span className={mealType}>{eachMeal.itemType}</span>
              </p>
              <div className={`flex flex-row gap-2${mealQuantity}`}>
                <p>
                  <span className="p-2 border-[1px] text-gray-400 cursor-pointer">
                    -
                  </span>
                  <span className="p-2 border-[1px] text-gray-400">
                    {quantity}
                  </span>
                  <span className="p-2 border-[1px] text-gray-400 cursor-pointer">
                    +
                  </span>
                </p>
                <span className="text-gray-300 text-[12px] ml-3">quantity</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <ul className={mealsContainer}>
      {meals.map((eachMeal) => {
        const quantity = activeTab === "full" ? eachMeal.full : eachMeal.half;
        return (
          <li key={v4()} className={mealContainer}>
            <p className={mealItem}>
              {eachMeal.item}
              <br />
              <span className={mealType}>{eachMeal.itemType}</span>
            </p>
            <p className={mealQuantity}>{quantity} quantity</p>
          </li>
        );
      })}
    </ul>
  );
};
export default Meals;
