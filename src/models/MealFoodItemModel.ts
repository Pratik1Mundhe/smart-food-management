import { makeAutoObservable } from "mobx";
import { FoodItemType } from "../types";

class MealFoodItemModel {
  id: string;
  name: string;
  fullMealQuantity: number;
  halfMealQuantity: number;
  customMealQuantity: number;
  constructor(mealItem: FoodItemType) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.id = mealItem.id;
    this.name = mealItem.name;
    this.fullMealQuantity = mealItem.fullMealQuantity;
    this.halfMealQuantity = mealItem.halfMealQuantity;
    this.customMealQuantity = 0;
  }
  increaseCustomMeal() {
    this.customMealQuantity = this.customMealQuantity + 1;
  }
  decreaseCustomMeal() {
    this.customMealQuantity = this.customMealQuantity - 1;
  }
}

export default MealFoodItemModel;
