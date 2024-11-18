import { makeAutoObservable } from "mobx";

import MealFoodItemModel from "./MealFoodItemModel";
import { MealTypeEnum } from "../types";

class ScheduledMealModel {
  mealId: string | null = null;
  mealType: MealTypeEnum | null = null;
  items: MealFoodItemModel[] = [];
  constructor(
    mealId: string,
    mealType: MealTypeEnum,
    items: MealFoodItemModel[]
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.mealId = mealId;
    this.mealType = mealType;
    this.items = items;
  }
}

export default ScheduledMealModel;
