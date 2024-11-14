import foodItemsStore from "../../../store/FoodItemsStore";
import { FoodItemsResponseType } from "../../../types";

export const onSuccess = (foodItems: FoodItemsResponseType[]) => {
  foodItemsStore.addFoodItems(foodItems);
};
export const onFail = () => {};
