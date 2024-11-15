import { makeAutoObservable } from "mobx";
import { MealFoodItemType } from "../types";

class MealFoodItemModel {
  id: string;
  name: string;
  fullMealQuantity: number;
  halfMealQuantity: number;
  customMealQuantity: number;

  constructor(mealItem: MealFoodItemType) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.id = mealItem.id;
    this.name = mealItem.name;
    this.fullMealQuantity = mealItem.fullMealQuantity;
    this.halfMealQuantity = mealItem.halfMealQuantity;
    this.customMealQuantity = 0;
  }
  add() {
    this.customMealQuantity = this.customMealQuantity + 1;
  }
  sub() {
    this.customMealQuantity = this.customMealQuantity - 1;
  }
}

export default MealFoodItemModel;
