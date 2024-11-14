import { makeAutoObservable } from "mobx";

import MealFoodItemModel from "./MealFoodItemModel";
import { MealTypeEnum } from "../types";

class ScheduledMealModel {
  date: string | null = null;
  mealType: MealTypeEnum | null = null;
  items: MealFoodItemModel[] = [];

  constructor(
    date: string,
    mealType: MealTypeEnum,
    items: MealFoodItemModel[]
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.date = date;
    this.mealType = mealType;
    this.items = items;
  }
}

export default ScheduledMealModel;
