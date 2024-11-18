import { makeAutoObservable } from "mobx";

import MealFoodItemModel from "./MealFoodItemModel";
import { MealTypeEnum } from "../types";

class ScheduledMealModel {
  mealType: MealTypeEnum | null = null;
  items: MealFoodItemModel[] = [];
  constructor(mealType: MealTypeEnum, items: MealFoodItemModel[]) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.mealType = mealType;
    this.items = items;
  }
}

export default ScheduledMealModel;
