import scheduledMealStore from "../store/ScheduledMealStore";
import { MealTypeEnum } from "../types";

//Remove any type
function selectedMealTypeData(activeTab: string, typeOfMeal: any) {
  const items = scheduledMealStore.mealData[
    typeOfMeal as MealTypeEnum
  ]?.items.map((each) => {
    if (activeTab === "full") {
      return {
        id: each.id,
        name: each.name,
        fullMealQuantity: each.fullMealQuantity,
      };
    }
    if (activeTab === "half") {
      return {
        id: each.id,
        name: each.name,
        halfMealQuantity: each.halfMealQuantity,
      };
    }
  });
  return items;
}

export default selectedMealTypeData;
