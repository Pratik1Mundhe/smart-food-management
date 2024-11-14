import { v4 } from "uuid";
import {
  mealContainer,
  mealsCustomContainer,
  mealsContainer,
  mealItem,
  mealType,
  mealQuantity,
} from "./styles";
import CustomMeal from "./CoustomMeal";

const Meals = ({ meals, activeTab }) => {
  if (activeTab === "custom") {
    return (
      <ul className={mealsCustomContainer}>
        {meals.map((eachMeal) => {
          return <CustomMeal eachMeal={eachMeal} />;
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
