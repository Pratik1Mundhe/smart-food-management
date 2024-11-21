import MealFoodItemModel from "../models/MealFoodItemModel";
import CustomMealStore from "../store/CustomMealStore";
import { MealPreferenceEnum, MealTypeEnum } from "../types";
import calculateCustomIndex from "./calculateCustomIndex";

function formatQuantityData(
  meals: MealFoodItemModel[] | undefined,
  activeTab: string,
  type: MealTypeEnum
) {
  const formattedData = meals!.map((each) => {
    if (activeTab === MealPreferenceEnum.FULL) {
      return {
        itemId: each.id,
        quantity: each.fullMealQuantity,
      };
    } else if (activeTab === MealPreferenceEnum.HALF) {
      return {
        itemId: each.id,
        quantity: each.halfMealQuantity,
      };
    } else {
      if (CustomMealStore.meals.length > 0) {
        const index = calculateCustomIndex(type);
        return CustomMealStore.meals[index].items.map((each) => {
          return {
            itemId: each.id,
            quantity: each.customMealQuantity,
          };
        });
      } else {
        return {
          itemId: each.id,
          quantity: each.customMealQuantity,
        };
      }
    }
  });
  return formattedData;
}
export default formatQuantityData;
