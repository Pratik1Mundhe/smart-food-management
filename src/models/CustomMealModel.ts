import { MealTypeEnum, UserPreferenceDataType } from "../types";
import CustomMealItemModel from "./CustomMealItemModel";
import { makeAutoObservable } from "mobx";

export interface CustomMealType {
  mealType: MealTypeEnum | null;
  mealId: string;
  items: UserPreferenceDataType[];
}

class CustomMealModel {
  mealType: MealTypeEnum | null;
  mealId: string;
  items: CustomMealItemModel[];
  constructor(customMeal: CustomMealType) {
    this.mealType = customMeal.mealType;
    this.mealId = customMeal.mealId;
    this.items = customMeal.items.map(
      (each) =>
        new CustomMealItemModel(each.id, each.name, each.customMealQuantity)
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export default CustomMealModel;
