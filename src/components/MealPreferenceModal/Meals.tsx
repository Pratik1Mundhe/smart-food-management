import { v4 } from "uuid";
import {
  mealContainer,
  mealsCustomContainer,
  mealsContainer,
  mealItem,
  mealQuantity,
} from "./styles";
import CustomMeal from "./CustomMeal";
import UserMealStore from "../../store/UserMealStore";

interface MealsType {
  activeTab: string;
}

const Meals = (prop: MealsType) => {
  const { activeTab } = prop;
  if (activeTab === "custom") {
    return (
      <ul className={mealsCustomContainer}>
        {UserMealStore.mealsDetails.map((eachMeal, index) => {
          console.log(index);
          return <CustomMeal eachMeal={eachMeal} index={index} />;
        })}
      </ul>
    );
  }
  return (
    <ul className={mealsContainer}>
      {UserMealStore.mealsDetails.map((eachMeal, index) => {
        const quantity =
          activeTab === "full"
            ? eachMeal.mealPreference
            : eachMeal.mealPreference;
        return (
          <li key={v4()} className={mealContainer}>
            <p className={mealItem}>
              {eachMeal.foodItem[index].name}
              <br />
            </p>
            <p className={mealQuantity}>{quantity} quantity</p>
          </li>
        );
      })}
    </ul>
  );
};
export default Meals;
