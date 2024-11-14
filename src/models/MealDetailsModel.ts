import { makeAutoObservable } from "mobx";
import { MealPreferenceEnum, MealStatusEnum, MealTypeEnum } from "../types";
import MealFoodItemModel from "./MealFoodItemModel";
import { MealDetailsType } from "../types";

class MealDetailsModel {
  mealType: MealTypeEnum;
  mealId: string;
  mealPreference: MealPreferenceEnum;
  mealStatus: MealStatusEnum;
  foodItem: MealFoodItemModel[];

  constructor(mealDetails: MealDetailsType) {
    this.mealType = mealDetails.mealType;
    this.mealId = mealDetails.mealType;
    this.mealPreference = mealDetails.mealPreference;
    this.mealStatus = mealDetails.mealStatus;
    this.foodItem = mealDetails.foodItem;
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export default MealDetailsModel;
