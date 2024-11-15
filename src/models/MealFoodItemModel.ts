import { makeAutoObservable } from "mobx";
import { FoodItemType } from "../types";

class MealFoodItemModel {
  id: string;
  name: string;
  fullMealQuantity: number;
  halfMealQuantity: number;

  constructor(mealItem: FoodItemType) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.id = mealItem.id;
    this.name = mealItem.name;
    this.fullMealQuantity = mealItem.fullMealQuantity;
    this.halfMealQuantity = mealItem.halfMealQuantity;
  }
}

export default MealFoodItemModel;
