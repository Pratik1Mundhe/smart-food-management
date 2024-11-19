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

  addFoodItem(
    id: string,
    name: string,
    fullMealQuantity: number,
    halfMealQuantity: number
  ) {
    this.items.push(
      new MealFoodItemModel(id, name, fullMealQuantity, halfMealQuantity)
    );
  }

  removeFoodItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}

export default ScheduledMealModel;
