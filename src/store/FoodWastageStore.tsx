import { makeAutoObservable } from "mobx";
import FoodWastageModel from "../models/FoodWastageModel";
import { FoodItemsType, MealTypeEnum, ReviewTypes } from "../types";

class _FoodWastageStore {
  foodWastageOnDate = new Map();
  foodWastageOnMealType: ReviewTypes;
  constructor() {
    this.foodWastageOnMealType = {
      breakfast: null,
      lunch: null,
      dinner: null,
    };
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setFoodWastageOnMealType(
    items: FoodItemsType,
    mealType: MealTypeEnum,
    date: string
  ) {
    this.foodWastageOnMealType[mealType] = new FoodWastageModel(items);
    this.foodWastageOnDate.set(date, this.foodWastageOnMealType);
  }
}

const FoodWastageStore = new _FoodWastageStore();
export default FoodWastageStore;
