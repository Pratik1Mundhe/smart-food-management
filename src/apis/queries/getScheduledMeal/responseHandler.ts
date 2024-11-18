import scheduledMealStore from "../../../store/ScheduledMealStore";
import { MealTypeEnum, ScheduledMealResponseType } from "../../../types";

export const onSuccess = (mealData: ScheduledMealResponseType) => {
  const { date, mealType, mealId, items } = mealData;
  scheduledMealStore.setScheduledMeal(
    date,
    MealTypeEnum[mealType as keyof typeof MealTypeEnum],
    mealId,
    items
  );
};
export const onFailure = () => {};
